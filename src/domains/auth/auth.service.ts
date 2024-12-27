import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { HashingService } from 'src/common/hashing/hashing.service';
import type { RequestUser } from './types/auth';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './types/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocal(email: string, password: string): Promise<RequestUser> {
    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('Invalid Credential!');

    const isPasswordMatch = await this.hashingService.compare(
      password,
      user.password,
    );

    if (!isPasswordMatch) throw new NotFoundException('Invalid Credential!');

    const requestUser: RequestUser = { id: user.id };

    return requestUser;
  }

  async validateJwt(payload: JwtPayload) {
    const user = await this.db.user.findUnique({ where: { id: payload.sub } });

    if (!user) throw new UnauthorizedException('Invalid token!');

    return {
      id: user.id,
    };
  }

  async userLogin(user: RequestUser) {
    const payload: JwtPayload = {
      sub: user.id,
    };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
