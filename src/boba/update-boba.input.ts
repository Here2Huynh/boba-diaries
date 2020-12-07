import { PartialType, InputType } from '@nestjs/graphql/dist';
import { CreateBobaInput } from './create-boba.input';

@InputType()
export class UpdateBobaInput extends PartialType(CreateBobaInput) {}
