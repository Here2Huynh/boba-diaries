import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { JwtStrategy } from './strategies/jwt.strategy';

const mockedUserCredentials = {
  username: 'TestUsername',
  password: 'TestPassword',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            return {
              secret: configService.get<string>('JWT_SECRET'),
              signOptions: {
                expiresIn: 3600,
              },
            };
          },
          inject: [ConfigService],
        }),
      ],
      providers: [
        AuthService,
        UsersService,
        ConfigService,
        UserRepository,
        JwtStrategy,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('throw unauthorized exception if invalid credentials', async () => {
      userService.validateUser = jest.fn().mockResolvedValue(null);

      expect(authService.login(mockedUserCredentials)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('returns user object if valid credentials', async () => {
      userService.validateUser = jest
        .fn()
        .mockResolvedValue({ ...mockedUserCredentials, id: '1' });
      jwtService.sign = jest.fn().mockReturnValue('testToken');

      const res = await authService.login(mockedUserCredentials);

      expect(userService.validateUser).toHaveBeenCalledWith(
        mockedUserCredentials,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: mockedUserCredentials.username,
      });
      expect(res).toEqual({ id: '1', accessToken: 'testToken' });
    });
  });
});
