import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserLoginInput } from '../users/inputs/signin-user.input';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(userLoginIn: UserLoginInput): Promise<{ accessToken: string }> {
    const foundUser = await this.usersService.validateUser(userLoginIn);

    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username: foundUser.username };
    const accessToken = this.jwtService.sign(payload);

    this.logger.debug(
      `Generated JWT for payload: ${JSON.stringify(accessToken)}`,
    );

    return { accessToken };
  }
}
