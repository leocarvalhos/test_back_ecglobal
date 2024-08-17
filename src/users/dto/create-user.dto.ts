import { IsDate, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nickname is required' })
  nickname: string;

  @IsDate({ message: 'Birthdate is required' })
  birthdate: Date;

  @IsEmail()
  email: string;

  @IsString({ message: 'Password is required' })
  password: string;
}
