import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PostsModule } from 'src/posts/posts.module';
config();
@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => PostsModule),
    forwardRef(() => PassportModule),
    forwardRef(() =>
      JwtModule.register({
        secret: process.env.JWT_PASS,
        signOptions: { expiresIn: '4h' },
      }),
    ),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
