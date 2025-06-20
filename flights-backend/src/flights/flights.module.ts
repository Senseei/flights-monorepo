import { Module } from '@nestjs/common';
import { Flight } from '@flights/entities/flight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsService } from './flights.service';
import { FlightsRepository } from '@flights/flights.repository';
import { FlightsController } from './controllers/flights.controller';
import { BookmarksController } from './controllers/bookmarks.controller';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Flight]), UsersModule],
  controllers: [FlightsController, BookmarksController],
  providers: [FlightsService, FlightsRepository],
  exports: [],
})
export class FlightsModule {}
