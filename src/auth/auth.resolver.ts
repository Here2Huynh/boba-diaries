import { Resolver, Mutation, Args } from '@nestjs/graphql/dist';
import { AuthService } from './auth.service';
import { CreateUserInput } from './create-user.input';
import { UserType } from './user.type';
import { SignInUserInput } from './signin-user.input';
import { JwtType } from './jwt-token-return.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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

  @Mutation((returns) => UserType)
  // @UseGuards(AuthGuard())
  async test(@Args('jwtToken') jwtToken: string) {
    console.log('jwtToken', jwtToken);
  }
}

// features to add
// x - add password encrpytion
// x - add signIn functionality

// - link user to boba
// - add JWT functionality
