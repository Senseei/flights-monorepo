import { Module } from '@nestjs/common';
import { Flight } from '@flights/entities/flight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  controllers: [],
  providers: [],
  exports: [],
})
export class FlightsModule {}
