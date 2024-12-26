import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dtos/create-user-dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  createUser(body: CreateUserDto) {
    return this.db.user.create({
      data: {
        ...body,
      },
    });
  }

  findOne(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }

  cancelFlight(id: number, flightId: number) {
    return this.db.user.update({
      where: { id },
      data: {
        flights: {
          disconnect: {
            id: flightId,
          },
        },
      },
    });
  }
}
