import { Injectable } from '@nestjs/common';
import { posts } from '../data/posts';
import { PageInput } from './dto/cursor.input';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class PostsService {
  findAll(pageInputData: PageInput) {
    console.log(pageInputData);
    const index = posts.findIndex((p) => p.id === pageInputData.cursor);
    if (index < 0) {
      throw new UserInputError('Cursor not exist');
    }
    const nbPages = Math.ceil(posts.length / pageInputData.limit);

    return {
      hasNextPage: posts.length > index + pageInputData.limit,
      pages: nbPages,
      posts: posts.slice(index, pageInputData.limit + index),
    };
  }

  findOne(id: number) {
    return posts.find((p) => p.id === id);
  }
}
