import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { TaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { TasksService } from '../services/tasks.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ProjectFilterDto } from '../../projects/dtos/project-filter.dto';
import { TaskFilterDto } from '../dtos/task-filter.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Post('projects/:id/tasks')
  @ApiOperation({ summary: 'Crear nueva tarea' })
  create(@Param('id') id: string, @Body() body: TaskDto) {
    return this.service.create(id, { ...body });
  }

  @Get('projects/:id/tasks')
  @ApiOperation({ summary: 'Tareas de un proyecto (con filtros)' })
  findAll(@Query() filters: TaskFilterDto, @Param('id') id: string) {
    return this.service.findAll(id, filters);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tarea (estado, asignado, etc.)' })
  update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tarea' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
