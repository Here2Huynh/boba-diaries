import { PartialType, InputType, Field } from '@nestjs/graphql/dist';
import { CreateBobaInput } from './create-boba.input';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateBobaInput extends PartialType(CreateBobaInput) {
  @MinLength(1)
  @Field()
  date: string;
}
