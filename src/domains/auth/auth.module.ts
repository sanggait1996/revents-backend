import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from '@domains/auth/auth.controller';
import { AuthService } from '@domains/auth/auth.service';
import { LocalStrategy } from '@domains/auth/strategies/local.strategy';
import { LoginValidatorMiddleware } from '@domains/auth/middleware/login-validator/login-validator.middleware';
import { JwtModule } from '@nestjs/jwt';
import jwt from '@config/jwt';
import { JwtStrategy } from '@domains/auth/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@domains/auth/guards/jwt.guard';

@Module({
  imports: [JwtModule.registerAsync(jwt.asProvider())],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidatorMiddleware).forRoutes('auth/login');
  }
}
