import { Module } from '@nestjs/common';
import { UsersController } from '@domains/users/users.controller';
import { UsersService } from '@domains/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
