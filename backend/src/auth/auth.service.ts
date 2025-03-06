import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    try {
      const newUser = await this.usersService.create(createUserDto);
      if (!newUser) {
        throw new BadRequestException('Failed to create user');
      }
      return {
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Registration failed');
    }
  }

  async login(loginDto: loginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  }


  async getUserProfile(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profile_picture: user.profile_picture,
    };
  }
}
