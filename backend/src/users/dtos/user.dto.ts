import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class UserDto {
    @ApiProperty({ description: 'nombre completo' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'correo electronico' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Contraseña (minimo 6 caracteres)' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional({
        description: 'Cargo',
        enum: ['admin', 'manager', 'developer'],
        default: 'developer',
    })
    @IsOptional()
    @IsEnum(['admin', 'manager', 'developer'])
    role?: 'admin' | 'manager' | 'developer';

    @ApiPropertyOptional({ description: 'URL de la imagen' })
    @IsOptional()
    @IsString()
    avatar?: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}
