import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Post],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
