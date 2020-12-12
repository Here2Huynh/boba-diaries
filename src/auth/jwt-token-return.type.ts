import { Field, ObjectType } from '@nestjs/graphql/dist';

@ObjectType()
export class JwtType {
  @Field()
  accessToken: string;
}
