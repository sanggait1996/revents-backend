import { Global, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { PrismaClientExceptionFilter, PrismaModule } from 'nestjs-prisma';
import { database, environment, port } from '../config';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';
import { LoggerModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environment, port, database],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'dd-mm-yyyy HH:mm:ss',
          },
        },
      },
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
    {
      provide: APP_FILTER,
      useValue: new PrismaClientExceptionFilter(),
    },
  ],
  exports: [],
})
export class CoreModule {}
