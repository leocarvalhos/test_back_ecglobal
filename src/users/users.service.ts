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
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<void> {
    const { email } = createUserDto;

    const userAlreadyExist = await this.userRepository.findOneBy({ email });

    if (userAlreadyExist) throw new Error('User already exist!');

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = {
      ...createUserDto,
      password: hashPassword,
    };

    await this.userRepository.save(user);

    return;
  }

  async findAll() {
    return await this.userRepository.find({
      select: {
        nickname: true,
      },
    });
  }

  async findOneBy(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
