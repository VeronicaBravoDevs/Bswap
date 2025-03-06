import { ApiProperty } from '@nestjs/swagger';

import {
<<<<<<< HEAD
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  IsArray,
=======
    IsEmail,
    IsNotEmpty,
    IsString,
    IsOptional,
    MaxLength,
    MinLength,
    ValidateNested,
    IsArray,
    IsInt,
>>>>>>> a9d5c2517c64c1cf29ccd4675d3f0bad63ac0278
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

<<<<<<< HEAD
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
=======
    @IsString()
    @IsOptional()
    lastName?: string
    @IsString()
    @IsOptional()
    country?: string

    @IsString()
    @IsOptional()
    city?: string

    @IsString()
    @IsOptional()
    phone?: string


    @IsString()
    @IsOptional()
    avatarUrl?: string

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo de contraseña no puede estar vacío.' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @MaxLength(20, {
        message: 'La contraseña no puede tener más de 20 caracteres.',
    })
    password: string

    @ApiProperty()
    @IsArray()
    library?: string
>>>>>>> a9d5c2517c64c1cf29ccd4675d3f0bad63ac0278
}
