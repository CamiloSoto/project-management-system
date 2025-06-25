import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({} as any);
    authGuard = new AuthGuard(jwtService);
  });

  const mockExecutionContext = (authHeader?: string): ExecutionContext => {
    const request = {
      headers: {
        authorization: authHeader,
      },
    } as Request;

    return {
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
    } as unknown as ExecutionContext;
  };

  it('should allow access with valid token', async () => {
    const context = mockExecutionContext('Bearer valid.token');
    const payload = { sub: 'user123' };

    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(payload);

    const result = await authGuard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if token is missing', async () => {
    const context = mockExecutionContext();

    await expect(authGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    const context = mockExecutionContext('Bearer invalid.token');

    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockRejectedValue(new Error('Invalid token'));

    await expect(authGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
