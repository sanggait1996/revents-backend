import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { UserLoginDto } from '@domains/auth/dto/login-dto';
import { validate } from 'class-validator';

@Injectable()
export class LoginValidatorMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    const loginDto = plainToInstance(UserLoginDto, req.body);

    const errors = await validate(loginDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const errorMessages = errors.map((error) =>
        Object.values(error.constraints ?? {}),
      );
      throw new BadRequestException(errorMessages);
    }

    next();
  }
}
