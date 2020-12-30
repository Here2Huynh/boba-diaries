import { InputType, Field, ID } from '@nestjs/graphql/dist';
import {
  MinLength,
  MaxLength,
  IsString,
  Matches,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Field()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak.',
  })
  @Field()
  password: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  bobas: string[];
}
