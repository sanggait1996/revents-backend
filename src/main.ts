import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.use(helmet());

  app.setGlobalPrefix(`${process.env.API_PREFIX}/${process.env.API_VERSION}`);

  const config = new DocumentBuilder()
    .setTitle('Revents API Documentation')
    .setDescription('Revents API description for application')
    .setVersion(process.env.API_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    `${process.env.API_PREFIX}/${process.env.API_VERSION}/docs`,
    app,
    document,
  );

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(+port);
}
bootstrap();
