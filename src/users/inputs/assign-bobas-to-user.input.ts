import { InputType, Field, ID } from '@nestjs/graphql/dist';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignBobaToUserInput {
  @IsUUID()
  @Field((type) => ID)
  userId: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  bobaIds: string[];
}
