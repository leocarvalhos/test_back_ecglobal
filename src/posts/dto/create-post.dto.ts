import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  comment?: string;

  @IsString()
  photo?: string;
}
