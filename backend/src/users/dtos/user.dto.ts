import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'nombre completo' })
  @IsString({ message: 'Nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  name: string;

  @ApiProperty({ description: 'correo electronico' })
  @IsEmail({}, { message: 'Correo electronico no valido' })
  email: string;

  @ApiProperty({ description: 'Contraseña (minimo 6 caracteres)' })
  @IsString()
  @MinLength(6, { message: 'la contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiPropertyOptional({
    description: 'Cargo',
    enum: ['admin', 'manager', 'developer'],
    default: 'developer',
  })
  @IsOptional()
  @IsEnum(['admin', 'manager', 'developer'], {
    message: 'El cargo debe ser admin, manager o developer',
  })
  role?: 'admin' | 'manager' | 'developer';

  @ApiPropertyOptional({ description: 'URL de la imagen' })
  @IsOptional()
  @IsString()
  avatar?: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}
