import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

const mockedUserCredentials = {
  username: 'TestUsername',
  password: 'TestPassword',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  describe('login', () => {
    // beforeEach(() => {

    // })

    it('validate user', async () => {
      const validatedUser = jest.fn();
      validatedUser.mockResolvedValue(undefined);
      await expect(
        await authService.login(mockedUserCredentials),
      ).resolves.not.toThrow();
    });

    it('throws an unauthorized exception if user does not exist', async () => {
      //
    });

    it('returns access token if authenicated', async () => {
      //
    });
  });
});
