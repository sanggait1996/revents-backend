import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { HashingService } from 'src/common/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async createUser(body: CreateUserDto) {
    body.password = await this.hashingService.hash(body.password);

    return await this.db.user.create({
      data: body,
      omit: {
        password: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.db.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  async findAll() {
    return await this.db.user.findMany({
      omit: { password: true },
    });
  }

  async update(id: string, body: UpdateUserDto) {
    const { password } = body;

    const hashPassword = password && (await this.hashingService.hash(password));

    return await this.db.user.update({
      where: { id },
      data: {
        ...body,
        password: hashPassword,
      },
      omit: {
        password: true,
      },
    });
  }
}
