import { InputType, Field } from '@nestjs/graphql/dist';
import { MinLength, IsDate } from 'class-validator';

@InputType()
export class BobaInput {
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

  @IsDate()
  @Field()
  date: string;
}
