import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from '@app/domains/users/dto/create-user-dto';
import { UpdateUserDto } from '@app/domains/users/dto/update-user-dto';
import { HashingService } from '@common/hashing/hashing.service';

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

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.db.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
    await this.db.location.delete({ where: { id } });
    return {
      message: `Delete user with id: ${id} successfully.`,
    };
  }
}
