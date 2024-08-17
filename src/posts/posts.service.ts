import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { uploadFile } from 'src/aws-s3/uploadImage';
import { IDataUploadImage } from 'src/interfaces/IDataUploadImage';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  async uploadImage(image: Express.Multer.File): Promise<IDataUploadImage> {
    const data = await uploadFile(
      image.originalname,
      image.buffer,
      image.mimetype,
    );

    return data;
  }

  async create(createPostDto: CreatePostDto) {}

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
