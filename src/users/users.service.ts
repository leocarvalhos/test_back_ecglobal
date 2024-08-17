import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<void> {
    const { email } = createUserDto;

    const userAlreadyExist = await this.usersRepository.findOneBy({ email });

    if (userAlreadyExist) throw new Error('User already exist!');

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = {
      ...createUserDto,
      password: hashPassword,
    };

    await this.usersRepository.save(user);

    return;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneBy(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
