import { ObjectType, Field, ID } from '@nestjs/graphql/dist';
import { BobaType } from '../../boba/boba.type';

@ObjectType()
export class ReturnUserType {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field((type) => [BobaType])
  bobas: string[];
}
