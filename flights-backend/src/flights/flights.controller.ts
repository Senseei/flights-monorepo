import { Controller, Get } from '@nestjs/common';
import { FlightsService } from '@flights/flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly service: FlightsService) {}

  @Get()
  public async findAll() {
    return this.service.findAll();
  }
}
