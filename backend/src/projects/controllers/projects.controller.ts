import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { ProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import { ProjectsService } from '../services/projects.service';
import { ProjectFilterDto } from '../dtos/project-filter.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';

@Controller('projects')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo proyecto' })
  create(@Body() body: ProjectDto, @Req() req: Request) {
    const user = req['user'];
    return this.service.create({ ...body }, user?.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Listar proyectos (con filtros y paginación)' })
  findAll(@Query() filters: ProjectFilterDto, @Req() req: Request) {
    const user = req['user'];
    return this.service.findAll(user?.sub, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener proyecto específico' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar proyecto' })
  update(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar proyecto' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
