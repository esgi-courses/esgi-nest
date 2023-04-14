import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PostService } from './posts.services';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll() {
    const posts = await this.postService.findAll();
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const post = await this.postService.findOne(id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return { id: post.id, title: post.title, body: post.body };
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    if (!createPostDto.title || !createPostDto.body) {
      throw new HttpException(
        'Title and body are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      typeof createPostDto.title !== 'string' ||
      typeof createPostDto.body !== 'string'
    ) {
      throw new HttpException(
        'Title and body must be strings',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (createPostDto.title.length > 50) {
      throw new HttpException(
        'Title length must be at most 50 characters',
        HttpStatus.BAD_REQUEST,
      );
    }
    const post = await this.postService.create(createPostDto);
    if (post) return { success: true, message: 'Post created successfully' };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    if (!uuid.validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    if (
      updatePostDto.title &&
      (typeof updatePostDto.title !== 'string' ||
        updatePostDto.title.length > 50)
    ) {
      throw new HttpException(
        'Title must be a string of at most 50 characters',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (updatePostDto.body && typeof updatePostDto.body !== 'string') {
      throw new HttpException('Body must be a string', HttpStatus.BAD_REQUEST);
    }
    const post = await this.postService.update(id, updatePostDto);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return { success: true, message: 'Post updated successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const post = await this.postService.remove(id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return { success: true, message: 'Post deleted successfully' };
  }
}
