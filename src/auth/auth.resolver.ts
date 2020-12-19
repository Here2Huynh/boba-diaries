import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql/dist';
import { AuthService } from './auth.service';
import { CreateUserInput } from './create-user.input';
import { UserType } from './user.type';
import { SignInUserInput } from './signin-user.input';
import { JwtType } from './jwt-token-return.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './auth.guard';
import { AssignBobaToStudentInput } from './assign-bobas-to-user.input';
import { ReturnUserType } from './update-user.type';
import { BobaService } from '../boba/boba.service';
import { User } from './user.entity';
import { BobaType } from '../boba/boba.type';

@Resolver((of) => UserType)
export class AuthResolver {
  constructor(
    private userService: AuthService,
    private bobaService: BobaService,
  ) {}

  @Mutation((returns) => UserType)
  async signUp(@Args('userInput') userInput: CreateUserInput) {
    return this.userService.signUp(userInput);
  }

  @Mutation((returns) => JwtType)
  async signIn(@Args('userSignIn') userSignIn: SignInUserInput) {
    return this.userService.signIn(userSignIn);
  }

  @Mutation((returns) => ReturnUserType)
  async assignBobaToStudent(
    @Args('assignBobaToStudentInput')
    assignBobaToStudentInput: AssignBobaToStudentInput,
  ) {
    const { userId, bobaIds } = assignBobaToStudentInput;
    return this.userService.assignBobaToStudent(userId, bobaIds);
  }

  @Query((returns) => String)
  @UseGuards(GqlAuthGuard)
  async test() {
    return 'jwtToken';
  }

  @ResolveField((returns) => BobaType)
  async getManyBobas(@Parent() user: User) {
    return this.bobaService.getManyBobas(user.bobas);
  }
}

// features to add
// x - add password encrpytion
// x - add signIn functionality
// - link user to boba
// x - add JWT functionality

// - add resolve field to complete student to boba link
// - [BUG] - not checks for duplicate usernames

// - add testing to all the modules
// - implement lists of boba
