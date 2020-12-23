import { Resolver, Mutation, Args, Query } from '@nestjs/graphql/dist';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/jwt-auth.guard';

import { AuthService } from './auth.service';
import { UserType } from '../users/types/user.type';
import { BobaService } from '../boba/boba.service';
import { JwtType } from './types/jwt-token-return.type';
import { UserLoginInput } from '../users/inputs/signin-user.input';

@Resolver((of) => UserType)
export class AuthResolver {
  constructor(
    private userService: AuthService,
    private bobaService: BobaService,
  ) {}

  @Mutation((returns) => JwtType)
  async login(@Args('userSignIn') userLogin: UserLoginInput) {
    return this.userService.login(userLogin);
  }

  @Query((returns) => String)
  @UseGuards(GqlAuthGuard)
  async test() {
    return 'jwtToken';
  }
}
