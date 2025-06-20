import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';

import { AppController } from './app.controller';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { CommonModule } from '@common/common.module';
import { FlightsModule } from './flights/flights.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule, AuthModule, CommonModule, FlightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}