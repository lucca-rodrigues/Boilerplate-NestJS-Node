import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'Database/Entities/User.entity';
import { Repository } from 'typeorm';
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

  create(dto: CreateUserDto) {
    this.usersRepository.insert({ name: dto.name, email: dto.email });
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
