import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get(':id')
  findAll(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
