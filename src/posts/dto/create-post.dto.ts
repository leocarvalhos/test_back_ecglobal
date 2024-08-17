import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  comment?: string;

  @IsString()
  imageUrl?: string;
}
