import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../../users/user.entity';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({
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
