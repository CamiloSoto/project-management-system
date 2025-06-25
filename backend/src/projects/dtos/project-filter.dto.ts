import { IsOptional, IsString, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectFilterDto {
  @ApiPropertyOptional({
    enum: ['planning', 'in_progress', 'completed', 'cancelled'],
    description: 'buscar por estado',
  })
  @IsOptional()
  @IsIn(['planning', 'in_progress', 'completed', 'cancelled'], {
    message:
      'El estado del proyecto debe ser planning, in_progress, completed o cancelled',
  })
  status?: string;

  @ApiPropertyOptional({
    enum: ['low', 'medium', 'high'],
    description: 'buscar por prioridad',
  })
  @IsOptional()
  @IsIn(['low', 'medium', 'high'], {
    message: 'La prioridad del proyecto debe ser low, medium o high',
  })
  priority?: string;

  @ApiPropertyOptional({
    description:
      'buscar por nombre/descripcion del proyecto sin importar mayusculas',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  name?: string;
}
