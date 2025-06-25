import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Administrador' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @ApiProperty({ example: 'admin@test.com' })
  @IsEmail({}, { message: 'Correo electronico no valido' })
  email: string;

  @ApiProperty({ example: 'admin123' })
  @IsString({ message: 'La contraseña debe ser texto' })
  @MinLength(6, { message: 'La contreña debe tener al menos 6 caracteres' })
  password: string;
}
