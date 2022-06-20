import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Posts {
  @Field()
  hasNextPage: boolean;

  @Field(() => Int)
  pages: number;

  @Field(() => [Post])
  posts: [Posts];
}

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => Int)
  userId: number;
}
