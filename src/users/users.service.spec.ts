import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';

const mockCredentials = {
  username: 'testUsername',
  password: 'testPassword',
};

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

const mockUserService = () => ({});

describe('UsersService', () => {
  let userRepository;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userService = module.get<UsersService>(UsersService);
  });

  describe('signUp', () => {
    it('checks if user exists, if so, returns Conflict error', async () => {
      //
    });

    it('if user does not exist, create user', async () => {
      //
    });
  });

  describe('validateUser', () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();

      user = new User();
      user.salt = 'testSalt';
      user.validatePassword = jest.fn();
    });

    it('returns user if user is valid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);

      const result = await userService.validateUser(mockCredentials);
      expect(result).toEqual(user);
    });

    it('returns null if password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);

      const result = await userService.validateUser(mockCredentials);
      expect(user.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('returns null if username not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      user.validatePassword.mockResolvedValue(false);

      const result = await userService.validateUser(mockCredentials);
      expect(user.validatePassword).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });
});
