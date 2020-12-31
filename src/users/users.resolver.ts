import {
  Resolver,
  Mutation,
  ResolveField,
  Args,
  Parent,
  Query,
} from '@nestjs/graphql/dist';

import { UserType } from './types/user.type';
import { CreateUserInput } from './inputs/create-user.input';
import { AssignBobaToUserInput } from './inputs/assign-bobas-to-user.input';
import { BobaType } from '../boba/boba.type';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { BobaService } from '../boba/boba.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly bobaService: BobaService,
  ) {}

  @Query((returns) => UserType)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.findUser(id);
  }

  @Public()
  @Mutation((returns) => UserType)
  async signUp(@Args('userInput') userInput: CreateUserInput) {
    return this.userService.signUp(userInput);
  }

  @Mutation((returns) => UserType)
  async assignBobaToUser(
    @Args('assignBobaToUserInput')
    assignBobaToUserInput: AssignBobaToUserInput,
  ) {
    const { userId, bobaIds } = assignBobaToUserInput;

    return this.userService.assignBobaToStudent(userId, bobaIds);
  }

  @ResolveField()
  async bobas(@Parent() user: User) {
    return this.bobaService.getManyBobas(user.bobas);
  }

  // @Query((returns) => UserType)
  // async whoAmI(@CurrentUser() user: User): Promise<User> {
  //   return this.userService.findUser(user);
  // }
}
