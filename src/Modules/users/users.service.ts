import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'Database/Entities/User.entity';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './Dtos/createuser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findById(id: string): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  async findOneOrFail(
    conditions: FindConditions<Users>,
    options?: FindOneOptions<Users>,
  ) {
    try {
      return await this.usersRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(dto: CreateUserDto) {
    const { email } = dto;
    const emailAlreadyExists = await this.usersRepository.findOne({
      email,
    });

    if (emailAlreadyExists) {
      throw new UnauthorizedException('Email already exists');
    }
    const user = this.usersRepository.create(dto);

    return await this.usersRepository.save(user);
  }

  update(id: string, dto: UpdateUserDto) {
    this.usersRepository.update(id, {
      name: dto.name,
      email: dto.email,
    });
  }

  delete(id: string) {
    this.usersRepository.delete(id);
  }
}
