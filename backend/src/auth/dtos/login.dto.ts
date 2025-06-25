import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@test.com' })
  @IsEmail({}, { message: 'Correo electronico no valido' })
  email: string;

  @ApiProperty({ example: 'admin123' })
  @IsString({ message: 'La contraseña debe ser texto' })
  @MinLength(6, { message: 'La contreña debe tener al menos 6 caracteres' })
  password: string;
}
