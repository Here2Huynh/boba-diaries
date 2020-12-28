import {
  Resolver,
  Mutation,
  ResolveField,
  Args,
  Parent,
} from '@nestjs/graphql/dist';
import { Query } from '@nestjs/common';

import { UserType } from './types/user.type';
import { CreateUserInput } from './inputs/create-user.input';
import { ReturnUserType } from './types/update-user.type';
import { AssignBobaToStudentInput } from './inputs/assign-bobas-to-user.input';
import { BobaType } from '../boba/boba.type';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { BobaService } from '../boba/boba.service';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly bobaService: BobaService,
  ) {}

  @Mutation((returns) => UserType)
  async signUp(@Args('userInput') userInput: CreateUserInput) {
    return this.userService.signUp(userInput);
  }

  @Mutation((returns) => ReturnUserType)
  async assignBobaToStudent(
    @Args('assignBobaToStudentInput')
    assignBobaToStudentInput: AssignBobaToStudentInput,
  ) {
    const { userId, bobaIds } = assignBobaToStudentInput;
    return this.userService.assignBobaToStudent(userId, bobaIds);
  }

  @ResolveField((returns) => BobaType)
  async getManyBobas(@Parent() user: User) {
    return this.bobaService.getManyBobas(user.bobas);
  }

  // @Query((returns) => UserType)
  // async whoAmI(@CurrentUser() user: User): Promise<User> {
  //   return this.userService.findUser(user);
  // }
}
