import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { UserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../../auth/guards/auth.guard';

import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../common/enums/role.enum';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crear desarrollador' })
  create(@Body() body: UserDto) {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar desarrolladores' })
  getAll() {
    return this.service.findAll();
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Actualizar desarrollador' })
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.update(id, body);
  }
}
