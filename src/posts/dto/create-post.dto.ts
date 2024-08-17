import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Comment is required' })
  comment: string;

  @IsString()
  photo?: string;
}
