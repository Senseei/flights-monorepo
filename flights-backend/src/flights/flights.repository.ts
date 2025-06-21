import { CRUDRepository } from '@common/common.repository';
import { Flight } from './entities/flight.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResult } from '@common/paginated-result';

export class FlightsRepository extends CRUDRepository<Flight> {
  constructor(
    @InjectRepository(Flight) repository: Repository<Flight>,
  ) {
    super(repository);
  }

  public async findBookmarksByUserId(
    userId: number,
    page: number,
    limit: number,
    sortField: keyof Flight = 'departure',
    sortOrder: 'ASC' | 'DESC' = 'DESC'
  ): Promise<PaginatedResult<Flight>> {
    const skip = (page - 1) * limit;

    const qb = this.repository
      .createQueryBuilder('flight')
      .innerJoin('tb_user_bookmarks', 'bookmark', 'bookmark.flight_id = flight.id')
      .where('bookmark.user_id = :userId', { userId })
      .orderBy(`flight.${sortField}`, sortOrder)
      .skip(skip)
      .take(limit);

    const [flights, total] = await qb.getManyAndCount();

    return new PaginatedResult<Flight>(flights, total);
  }
}