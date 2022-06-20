import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PageInput {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  cursor: number;
}
