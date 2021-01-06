import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { User } from './user.entity';

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
    it('returns user if user is valid', async () => {
      const testUser = new User();
      testUser.username = 'testUsername';

      userRepository.findOne.mockResolvedValue(testUser);

      const res = await userService.validateUser({
        username: 'testUsername',
        password: 'testPassword',
      });

      expect(userRepository.findOne).toHaveBeenLastCalledWith({
        username: 'testUsername',
      });

      expect(res).toEqual(testUser);
    });
  });
});
