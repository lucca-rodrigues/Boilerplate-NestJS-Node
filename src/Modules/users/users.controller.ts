import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Users } from '../../Database/Entities/User.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './Dtos/createuser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';
import { ValidateParams } from 'Modules/PipeValidations/validationParams';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersSwagger } from './Swagger/users.swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar usuários' })
  @ApiResponse({
    status: 200,
    description: 'Users list',
    type: UsersSwagger,
    isArray: true,
  })
  async findAll(): Promise<Users[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Users> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body(ValidateParams) user: CreateUserDto) {
    await this.usersService.create(user);
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    await this.usersService.update(id, user);
    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);
    return { message: 'User deleted' };
  }
}
