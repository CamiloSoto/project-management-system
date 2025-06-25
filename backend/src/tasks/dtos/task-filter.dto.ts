import { IsOptional, IsString, IsIn, IsMongoId } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TaskFilterDto {
  @ApiPropertyOptional({
    description: 'busca por el estado de la tarea',
    enum: ['todo', 'in_progress', 'review', 'done'],
  })
  @IsOptional()
  @IsIn(['todo', 'in_progress', 'review', 'done'], {
    message: 'El estado de la tarea debe ser todo, in_progress, review o done',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'buscar por prioridad de la tarea',
    enum: ['low', 'medium', 'high'],
  })
  @IsOptional()
  @IsIn(['low', 'medium', 'high'], {
    message: 'La prioridad de la tarea debe ser low, medium o high',
  })
  priority?: string;

  @ApiPropertyOptional({
    description: 'busca las tareas asignadas a un usuario',
  })
  @IsOptional()
  @IsMongoId({ message: 'Debe seleccionar un usuario valido' })
  assignedTo?: string;
}
