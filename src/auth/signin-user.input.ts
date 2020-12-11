import { PartialType, InputType, Field } from '@nestjs/graphql/dist';
import { UserType } from './user.type';

@InputType()
export class SignInUserInput extends PartialType(UserType) {
  @Field()
  username: string;

  @Field()
  password: string;
}
