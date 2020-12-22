import { Field, ObjectType } from '@nestjs/graphql/dist';
import { BobaType } from '../../boba/boba.type';

@ObjectType()
export class UserType {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field((type) => [BobaType])
  bobas: string[];
}
