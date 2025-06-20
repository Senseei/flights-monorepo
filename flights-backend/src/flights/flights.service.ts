import { Injectable } from '@nestjs/common';
import { FlightsRepository } from '@flights/flights.repository';
import { FlightDTO } from '@flights/dtos/FlightDTO';

@Injectable()
export class FlightsService {
  constructor(private readonly repository: FlightsRepository) {}

  public async findAll(): Promise<FlightDTO[]> {
    return (await this.repository.findAll()).map(it => new FlightDTO(it));
  }
}
