import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Debe introducir un valor',
  })
  @IsString({ message: 'El correo electronico debe ser texto' })
  @IsEmail({}, { message: 'Debe proporcionar un correo valido' })
  email: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo de contraseña no puede estar vacío.' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(20, {
    message: 'La contraseña no puede tener más de 20 caracteres.',
  })
  password: string;

  @ApiProperty()
  @IsArray()
  library?: string;
}
