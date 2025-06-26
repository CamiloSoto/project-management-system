import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { Role } from '../enums/role.enum';

function createMockExecutionContext(user: any): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
    getHandler: () => jest.fn(),
    getClass: () => jest.fn(),
  } as unknown as ExecutionContext;
}

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('should allow access if no roles are required (no @Roles decorator)', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

    const context = createMockExecutionContext({ role: [Role.Admin] });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow access if user has one of the required roles', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.Admin]);

    const context = createMockExecutionContext({ role: [Role.Admin] });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should deny access if user does not have any required roles', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.Manager]);

    const context = createMockExecutionContext({ role: [Role.Developer] });

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should deny access if user has no roles', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.Admin]);

    const context = createMockExecutionContext({});

    expect(guard.canActivate(context)).toBe(false);
  });
});
