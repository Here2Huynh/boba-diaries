import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserLoginInput } from '../users/inputs/signin-user.input';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { IAuthenicatedUser } from './interfaces/authenicated-user.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(userLoginIn: UserLoginInput): Promise<IAuthenicatedUser> {
    const validatedUser = await this.usersService.validateUser(userLoginIn);

    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username: validatedUser.username };
    const accessToken = this.jwtService.sign(payload);

    this.logger.debug(
      `Generated JWT for payload: ${JSON.stringify(accessToken)}`,
    );

    return { id: validatedUser.id, accessToken };
  }
}
