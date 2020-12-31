import { Field, ObjectType, ID } from '@nestjs/graphql/dist';
import { BobaType } from '../../boba/boba.type';

@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field((type) => [BobaType])
  bobas: string[];
}
