import { IsDate, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nickname: string;

  @IsDate()
  birthdate: Date;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
