import { ExecutionContext, Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UpdateUserDto, UserDto } from '../dtos/user.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };

  @Injectable()
  class MockAuthGuard {
    canActivate(context: ExecutionContext): boolean {
      return true;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call UsersService.create with correct data', async () => {
      const dto: UserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        role: 'developer',
      };

      const result = { id: '1', ...dto };
      mockUsersService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: '1', name: 'User 1' },
        { id: '2', name: 'User 2' },
      ];
      mockUsersService.findAll.mockResolvedValue(users);

      expect(await controller.getAll()).toEqual(users);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should call UsersService.update with correct id and data', async () => {
      const id = '123';
      const dto: UpdateUserDto = {
        name: 'Jane Doe',
        role: 'admin',
      };
      const updatedUser = { id, ...dto };

      mockUsersService.update.mockResolvedValue(updatedUser);

      expect(await controller.update(id, dto)).toEqual(updatedUser);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });
});
