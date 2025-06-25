import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserDto, UpdateUserDto } from '../dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
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
  @ApiOperation({ summary: 'Actualizar desarrollador' })
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.update(id, body);
  }
}
