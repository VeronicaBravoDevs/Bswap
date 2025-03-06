import { IsEmail, IsString } from 'class-validator';

export class loginDto {
  @IsString({ message: 'El correo electronico debe ser texto' })
  @IsEmail({}, { message: 'Debe proporcionar un correo valido' })
  email: string;
  @IsString()
  password: string;
}
