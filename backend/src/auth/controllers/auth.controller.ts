import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar el token' })
  @ApiHeader({
    name: 'x-refresh-token',
    description: 'Token de refresco',
    required: true,
  })
  async refreshToken(@Req() req: Request) {
    const refreshToken = req.headers['x-refresh-token']
      ?.toString()
      .replace('Bearer ', '');
    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    return this.authService.refresh(refreshToken);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro de usuarios' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  getProfile(@Req() req: Request) {
    return req['user'];
  }
}
