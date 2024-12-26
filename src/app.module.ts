import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { UsersModule } from './domains/users/users.module';
import { FlightsModule } from './domains/flights/flights.module';

@Module({
  imports: [CoreModule, UsersModule, FlightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
