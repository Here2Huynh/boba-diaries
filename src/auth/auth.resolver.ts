/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql/dist';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/jwt-auth.guard';

import { AuthService } from './auth.service';
import { UserType } from '../users/types/user.type';
import { AuthenicatedUserType } from './types/authenicated-user.type';
import { UserLoginInput } from '../users/inputs/signin-user.input';
import { Public } from './decorators/public.decorator';

@Resolver((of) => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation((returns) => AuthenicatedUserType)
  async login(@Args('userSignIn') userLogin: UserLoginInput) {
    return this.authService.login(userLogin);
  }

  @Query((returns) => String)
  @UseGuards(GqlAuthGuard)
  async test() {
    return 'jwtToken';
  }
}
