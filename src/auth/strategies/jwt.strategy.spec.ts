import { UnauthorizedException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { User } from '../../users/user.entity';

import { UserRepository } from '../../users/users.repository';
import { JwtStrategy } from './jwt.strategy';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('JWT strategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        ConfigService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    it('validate and return the user based off JWT payload', async () => {
      const testUser = new User();
      testUser.username = 'testUsername';

      userRepository.findOne.mockResolvedValue(testUser);

      const res = await jwtStrategy.validate({ username: 'testUsername' });

      expect(userRepository.findOne).toHaveBeenCalledWith({
        username: 'testUsername',
      });

      expect(res).toEqual(testUser);
    });

    it('throws unauthorized exception if invalid username', async () => {
      userRepository.findOne.mockResolvedValue(null);

      expect(
        jwtStrategy.validate({ username: 'testUsername' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
