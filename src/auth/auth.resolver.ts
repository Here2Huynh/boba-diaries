import { Resolver, Mutation, Args, Query } from '@nestjs/graphql/dist';
import { AuthService } from './auth.service';
import { CreateUserInput } from './create-user.input';
import { UserType } from './user.type';
import { SignInUserInput } from './signin-user.input';
import { JwtType } from './jwt-token-return.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Resolver((of) => UserType)
export class AuthResolver {
  constructor(private userService: AuthService) {}

  @Mutation((returns) => UserType)
  async signUp(@Args('userInput') userInput: CreateUserInput) {
    return this.userService.signUp(userInput);
  }

  @Mutation((returns) => JwtType)
  async signIn(@Args('userSignIn') userSignIn: SignInUserInput) {
    return this.userService.signIn(userSignIn);
  }

  @Query((returns) => String)
  @UseGuards(AuthGuard)
  async test() {
    return 'jwtToken';
  }
}

// features to add
// x - add password encrpytion
// x - add signIn functionality
// - link user to boba
// x - add JWT functionality
// - add testing to all the modules
// - implement lists of boba
