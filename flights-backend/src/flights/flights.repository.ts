import { CRUDRepository } from '@common/common.repository';
import { Flight } from './entities/flight.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class FlightsRepository extends CRUDRepository<Flight> {
  constructor(
    @InjectRepository(Flight) repository: Repository<Flight>,
  ) {
    super(repository);
  }
}