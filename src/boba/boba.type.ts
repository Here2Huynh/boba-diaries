import { ObjectType, Field } from '@nestjs/graphql/dist';

@ObjectType('Boba')
export class BobaType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  shop: string;

  @Field()
  rating: string;

  @Field()
  description: string;

  @Field()
  date: string;
}
