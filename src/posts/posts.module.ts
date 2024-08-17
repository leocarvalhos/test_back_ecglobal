import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PostOwnershipGuard } from 'src/auth/post-update.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => AuthModule)],
  providers: [PostsService, PostOwnershipGuard, JwtService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
