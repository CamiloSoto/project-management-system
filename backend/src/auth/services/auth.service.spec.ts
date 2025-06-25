import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../users/services/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser = {
    _id: 'user123',
    email: 'test@example.com',
    password: 'hashedpassword',
    role: 'developer',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should hash password and create user and return tokens', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'plaintext',
        name: 'Test',
      };

      const hashed = 'hashedPassword123';

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashed as never);
      userService.create.mockResolvedValue({
        ...mockUser,
        password: hashed,
      } as any);

      jwtService.sign.mockReturnValueOnce('access_token');
      jwtService.sign.mockReturnValueOnce('refresh_token');

      const result = await service.register(dto);
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
      expect(userService.create).toHaveBeenCalledWith({
        ...dto,
        password: hashed,
        role: 'developer',
        avatar: '',
      });
      expect(result).toEqual({
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        user: { sub: mockUser._id, email: mockUser.email, role: mockUser.role },
      });
    });
  });

  describe('login', () => {
    it('should throw if user not found', async () => {
      userService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({ email: 'nope@mail.com', password: '123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw if password does not match', async () => {
      userService.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(
        service.login({ email: mockUser.email, password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return tokens if credentials are valid', async () => {
      userService.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.sign.mockReturnValueOnce('access_token');
      jwtService.sign.mockReturnValueOnce('refresh_token');

      const result = await service.login({
        email: mockUser.email,
        password: 'correct',
      });

      expect(result).toEqual({
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        user: {
          sub: mockUser._id,
          email: mockUser.email,
          role: mockUser.role,
        },
      });
    });
  });

  describe('refresh', () => {
    it('should throw if token is invalid', async () => {
      jwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.refresh('bad-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return new tokens if token is valid', async () => {
      const payload = {
        sub: mockUser._id,
        email: mockUser.email,
        role: mockUser.role,
      };

      jwtService.verify.mockReturnValue(payload);
      jwtService.sign.mockReturnValueOnce('new_access_token');
      jwtService.sign.mockReturnValueOnce('new_refresh_token');

      const result = await service.refresh('valid-token');

      expect(result).toEqual({
        access_token: 'new_access_token',
        refresh_token: 'new_refresh_token',
        user: payload,
      });
    });
  });
});
