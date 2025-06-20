import { Controller, Get } from '@nestjs/common';
import { FlightsService } from '@flights/flights.service';
import { FlightDTO } from '@flights/dtos/FlightDTO';

@Controller('flights')
export class FlightsController {
  constructor(private readonly service: FlightsService) {}

  @Get()
  public async findAll(): Promise<FlightDTO[]> {
    return this.service.findAll();
  }
}
