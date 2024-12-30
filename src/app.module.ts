import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { CoreModule } from '@core/core.module';
import { UsersModule } from '@domains/users/users.module';
import { AuthModule } from '@domains/auth/auth.module';
import { LocationsModule } from './domains/locations/locations.module';

@Module({
  imports: [CoreModule, UsersModule, AuthModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
