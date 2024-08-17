import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uploadFile } from 'src/aws-s3/uploadImage';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async uploadImage(image: Express.Multer.File): Promise<string> {
    const { url } = await uploadFile(
      image.originalname,
      image.buffer,
      image.mimetype,
    );
    return url;
  }

  async create(id: string, createPostDto: CreatePostDto): Promise<void> {
    const post = {
      comment: createPostDto.comment,
      photo: createPostDto.photo,
      user: { id },
    };
    await this.postRepository.save(post);
  }

  async findAll() {
    const allPosts = await this.postRepository.find();
    return allPosts;
  }

  async findMyPostsBy(user_id: string) {
    const myPosts = await this.postRepository.find({
      where: {
        user: { id: user_id },
      },
    });
    return myPosts;
  }
  async findUserByPostID(post_id: string) {
    const { user } = await this.postRepository.findOne({
      select: { user: { id: true } },
      relations: { user: true },
      where: { id: post_id },
    });
    return user.id;
  }

  update(id: string, updatePostDto: UpdatePostDto) {}

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
