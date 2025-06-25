import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { User } from '../schemas/user.schema';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userModel: any;

  const mockUser = {
    _id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedpassword',
  };

  const userModelMock = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user', async () => {
      userModel.create.mockResolvedValue(mockUser);
      const result = await service.create(mockUser);
      expect(result).toEqual(mockUser);
      expect(userModel.create).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      userModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });
      const result = await service.findByEmail(mockUser.email);
      expect(result).toEqual(mockUser);
      expect(userModel.findOne).toHaveBeenCalledWith({ email: mockUser.email });
    });
  });

  describe('findAll', () => {
    it('should return all users without passwords', async () => {
      const users = [
        { ...mockUser, password: undefined },
        {
          ...mockUser,
          _id: '2',
          email: 'test2@example.com',
          password: undefined,
        },
      ];

      userModel.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(users),
        }),
      });

      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updated = { ...mockUser, name: 'Updated Name' };

      userModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updated),
      });

      const result = await service.update('1', { name: 'Updated Name' });
      expect(result).toEqual(updated);
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { name: 'Updated Name' },
        { new: true },
      );
    });
  });
});
