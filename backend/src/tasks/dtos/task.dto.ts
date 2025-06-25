import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TaskDto {
  @ApiProperty({ description: 'Titulo de la tarea' })
  @IsString()
  @IsNotEmpty({ message: 'El titulo no puede estar vacio' })
  title: string;

  @ApiPropertyOptional({ description: 'Descripcion de la tarea' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Estado de la tarea',
    enum: ['todo', 'in_progress', 'review', 'done'],
    default: 'todo',
  })
  @IsOptional()
  @IsEnum(['todo', 'in_progress', 'review', 'done'], {
    message: 'El estado de la tarea debe ser todo, in_progress, review o done',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Prioridad de la tarea',
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'], {
    message: 'La prioridad de la tarea debe ser low, medium o high',
  })
  priority?: string;

  @ApiProperty({ description: 'Proyecto' })
  @IsMongoId({message: 'Debe seleccionar un proyecto valido'})
  projectId?: string;

  @ApiPropertyOptional({ description: 'Tarea asignada a' })
  @IsOptional()
  @IsMongoId({message: 'Debe seleccionar un usuario valido'})
  assignedTo?: string;

  @ApiPropertyOptional({ description: 'horas estimadas para la tarea' })
  @IsOptional()
  @IsNumber()
  estimatedHours?: number;

  @ApiPropertyOptional({ description: 'horas reales para la tarea' })
  @IsOptional()
  @IsNumber()
  actualHours?: number;

  @ApiPropertyOptional({
    description: 'Fecha en la que se termino la tarea.',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;
}

export class UpdateTaskDto extends PartialType(TaskDto) {}
