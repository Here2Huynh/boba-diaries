import { InputType, Field } from '@nestjs/graphql/dist';
import { MinLength } from 'class-validator';

@InputType()
export class CreateBobaInput {
  @MinLength(1)
  @Field()
  name: string;

  @MinLength(1)
  @Field()
  shop: string;

  @MinLength(1)
  @Field()
  rating: string;

  @Field()
  description: string;
}
