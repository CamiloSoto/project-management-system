import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProjectDto {
  @ApiProperty({ description: 'Nombre del proyecto' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  name: string;

  @ApiPropertyOptional({ description: 'Descripcion del proyecto' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Estado del proyecto.',
    enum: ['planning', 'in_progress', 'completed', 'cancelled'],
    default: 'planning',
  })
  @IsOptional()
  @IsEnum(['planning', 'in_progress', 'completed', 'cancelled'], {
    message:
      'El estado del proyecto debe ser planning, in_progress, completed o cancelled',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Prioridad del proyecto.',
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'], {
    message: 'La prioridad del proyecto debe ser low, medium o high',
  })
  priority?: string;

  @ApiPropertyOptional({
    description: 'Fecha de inicio del proyecto.',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Fecha de fin del proyecto.',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @ApiPropertyOptional({ description: 'Id del administrador del proyecto' })
  @IsOptional()
  @IsMongoId({ message: 'El id del administrador debe ser un ObjectId' })
  managerId?: string;

  @ApiPropertyOptional({ description: 'Colaboradores', type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  developersIds?: string[];
}

export class UpdateProjectDto extends PartialType(ProjectDto) {}
