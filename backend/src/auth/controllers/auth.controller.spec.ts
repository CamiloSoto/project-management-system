import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../guards/auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockTokens = {
    access_token: 'access123',
    refresh_token: 'refresh123',
    user: {
      sub: '685c146653311ef5acbd3365',
      email: 'admin@test.com',
      role: 'admin',
    },
  };

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    refresh: jest.fn(),
  };

  @Injectable()
  class MockAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      return true;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: AuthGuard,
          useClass: MockAuthGuard,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  describe('register', () => {
    it('should register a user and return tokens', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      authService.register.mockResolvedValue(mockTokens);

      const result = await controller.register(dto);
      expect(authService.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockTokens);
    });
  });

  describe('login', () => {
    it('should login and return tokens', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password123',
      };

      authService.login.mockResolvedValue(mockTokens);

      const result = await controller.login(dto);
      expect(authService.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockTokens);
    });
  });

  describe('refreshToken', () => {
    it('should refresh token if valid refresh token provided', async () => {
      const mockRequest = {
        headers: {
          'x-refresh-token': 'Bearer refresh123',
        },
      } as unknown as Request;

      authService.refresh.mockResolvedValue(mockTokens);

      const result = await controller.refreshToken(mockRequest);
      expect(authService.refresh).toHaveBeenCalledWith('refresh123');
      expect(result).toEqual(mockTokens);
    });

    it('should throw UnauthorizedException if no refresh token provided', async () => {
      const mockRequest = {
        headers: {},
      } as unknown as Request;

      await expect(controller.refreshToken(mockRequest)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('getProfile', () => {
    it('should return user from request', () => {
      const mockRequest = {
        user: {
          sub: 'user123',
          email: 'test@example.com',
          role: 'developer',
        },
      } as any;

      const result = controller.getProfile(mockRequest);
      expect(result).toEqual(mockRequest.user);
    });
  });
});
