import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Post } from './posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  private readonly posts: Post[] = [];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: string): Post {
    return this.posts.find((post) => post.id === id);
  }

  create(createPostDto: CreatePostDto): Post {
    const post: Post = {
      id: uuidv4(),
      title: createPostDto.title,
      body: createPostDto.body,
    };
    this.posts.push(post);
    return post;
  }

  update(id: string, updatePostDto: UpdatePostDto): Post {
    const index = this.posts.findIndex((post) => post.id === id);
    this.posts[index] = {
      ...this.posts[index],
      ...updatePostDto,
    };
    return this.posts[index];
  }

  remove(id: string): boolean {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index >= 0) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }
}
