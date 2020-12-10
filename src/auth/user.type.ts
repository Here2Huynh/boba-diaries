import { Field, ObjectType } from '@nestjs/graphql/dist';

@ObjectType()
export class UserType {
  @Field()
  username: string;

  @Field()
  password: string;
}
