import { Module } from '@nestjs/common';
import { Flight } from '@flights/entities/flight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsService } from './flights.service';
import { FlightsRepository } from '@flights/flights.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  controllers: [],
  providers: [FlightsService, FlightsRepository],
  exports: [],
})
export class FlightsModule {}
