import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@domains/auth/auth.service';
import { LocalAuthGuard } from '@domains/auth/guards/local.guard';
import { CurrentUser } from '@domains/auth/decorators/current-user.decorator';
import type { RequestUser } from '@domains/auth/types/auth';
import { Public } from '@domains/auth/decorators/public-route.decorator';

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
