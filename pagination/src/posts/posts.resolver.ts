import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post, Posts } from './entities/post.entity';
import { PageInput } from './dto/cursor.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => Posts, { name: 'posts' })
  findAll(
    @Args('cursor', { type: () => Int }) cursor: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.postsService.findAll({ cursor, limit });
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }
}
