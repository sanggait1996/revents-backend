import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  async hash(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
