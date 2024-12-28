import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from '@domains/users/users.service';
import { CreateUserDto } from '@app/domains/users/dto/create-user-dto';
import { UpdateUserDto } from '@app/domains/users/dto/update-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}
