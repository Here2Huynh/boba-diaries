import { InputType, Field } from '@nestjs/graphql/dist';
import { MinLength } from 'class-validator';

@InputType()
export class UserInput {
  @MinLength(5)
  @Field()
  username: string;

  @MinLength(8)
  @Field()
  password: string;
}
