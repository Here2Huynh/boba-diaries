import { Field, ObjectType } from '@nestjs/graphql/dist';

@ObjectType()
export class AuthenicatedUserType {
  @Field()
  id: string;

  @Field()
  accessToken: string;
}
