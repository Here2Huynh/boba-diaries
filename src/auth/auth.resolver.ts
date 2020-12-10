import { Resolver, Mutation, Args } from '@nestjs/graphql/dist';
import { AuthService } from './auth.service';
import { CreateUserInput } from './create-user.input';
import { UserType } from './user.type';

@Resolver((of) => UserType)
export class AuthResolver {
  constructor(private userService: AuthService) {}

  @Mutation((returns) => UserType)
  async signUp(@Args('userInput') userInput: CreateUserInput) {
    return this.userService.signUp(userInput);
  }
}

// features to add
// - add password encrpytion
// - add signIn functionality
// - link user to boba
// - add JWT functionality
