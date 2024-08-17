import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostOwnershipGuard } from 'src/auth/post-update.strategy';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
    @Body('comment') comment: string,
  ) {
    const photo = image ? await this.postsService.uploadImage(image) : null;
    return await this.postsService.create(id, { comment, photo });
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findMyPostsBy(@Param('id') id: string) {
    return this.postsService.findMyPostsBy(id);
  }

  @UseGuards(JwtAuthGuard, PostOwnershipGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (updatePostDto.photo) {
      updatePostDto.photo = await this.postsService.uploadImage(image);
    }
    return this.postsService.update(id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard, PostOwnershipGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
