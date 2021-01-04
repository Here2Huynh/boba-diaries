import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UserRepository } from '../users/users.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boba } from '../boba/boba.entity';

const mockedUserCredentials = {
  username: 'TestUsername',
  password: 'TestPassword',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  // let jwtService: JwtService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [
    //     PassportModule.register({ defaultStrategy: 'jwt' }),
    //     JwtModule.registerAsync({
    //       imports: [ConfigModule],
    //       useFactory: async (configService: ConfigService) => {
    //         return {
    //           secret: configService.get<string>('JWT_SECRET'),
    //           signOptions: {
    //             expiresIn: 3600,
    //           },
    //         };
    //       },
    //       inject: [ConfigService],
    //     }),
    //   ],
    //   providers: [
    //     AuthService,
    //     UsersService,
    //     ConfigService,
    //     UserRepository,
    //     JwtStrategy,
    //   ],
    // }).compile();
    // authService = module.get<AuthService>(AuthService);
    // userService = module.get<UsersService>(UsersService);
    // jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    // beforeEach(() => {

    // })

    it('validate user', async () => {
      // const validatedUser = jest.fn();
      // validatedUser.mockResolvedValue(undefined);
      // await expect(
      //   await authService.login(mockedUserCredentials),
      // ).resolves.not.toThrow();
    });

    it('throws an unauthorized exception if user does not exist', async () => {
      //
    });

    it('returns access token if authenicated', async () => {
      //
    });
  });
});
