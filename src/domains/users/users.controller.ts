import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '@domains/users/users.service';
import { CreateUserDto } from '@app/domains/users/dto/create-user-dto';
import { UpdateUserDto } from '@app/domains/users/dto/update-user-dto';
import { ApiOperationDecorator } from '@app/common/decorators/api-operation.decorator';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperationDecorator({
    type: UserResponseDto,
    summary: 'Create a location',
    description: 'Create a new location',
  })
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @ApiOperationDecorator({
    type: [UserResponseDto],
    summary: 'Find all users',
    description: 'Find all users',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperationDecorator({
    type: UserResponseDto,
    summary: 'Get user by id',
    description: 'Get user by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperationDecorator({
    type: UserResponseDto,
    summary: 'Update user by id',
    description: 'Update user by id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete()
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.remove(id);
  }
}
