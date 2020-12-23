import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-jwt';

import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.usersService.validateUser({
      username,
      password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

// i think in order to fix this
// i need to link the auth logic to users and then inject users into boba
