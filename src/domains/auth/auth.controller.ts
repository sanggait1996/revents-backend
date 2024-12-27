import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { RequestUser } from './types/auth';
import { Public } from './decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Public()
  async login(@CurrentUser() currentUser: RequestUser) {
    return await this.authService.userLogin(currentUser);
  }
}
