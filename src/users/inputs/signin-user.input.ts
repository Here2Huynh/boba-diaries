import { PartialType, InputType, Field } from '@nestjs/graphql/dist';
import { UserType } from '../types/user.type';

@InputType()
export class UserLoginInput extends PartialType(UserType) {
  @Field()
  username: string;

  @Field()
  password: string;
}
