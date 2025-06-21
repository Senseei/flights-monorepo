import { Injectable } from '@nestjs/common';
import { FlightsRepository } from '@flights/flights.repository';
import { FlightDTO } from '@flights/dtos/FlightDTO';
import { UsersRepository } from '@users/users.repository';
import { EntityNotFoundException } from '@common/exceptions/entity-not-found.exception';
import { FlightAlreadyBookmarkedException } from '@flights/exceptions/flight-already-bookmarked.exception';
import { PaginationParamsDTO } from '@common/dtos/pagination-params.dto';
import { FlightFiltersDTO } from '@flights/dtos/flight-filters.dto';
import { PaginatedResultDTO } from '@common/dtos/paginated-result.dto';
import { Flight } from '@flights/entities/flight.entity';
import { EntityValidatorService } from '@common/entity-validator.service';

@Injectable()
export class FlightsService {
  constructor(
    private readonly repository: FlightsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly entityValidatorService: EntityValidatorService,
  ) {}

  public async findAll(pagination: PaginationParamsDTO, filters: FlightFiltersDTO): Promise<PaginatedResultDTO<FlightDTO>> {
    const { page, limit, sortField, sortOrder } = pagination;
    const validatedSortField = this.entityValidatorService.getSafeEntityKey(Flight, sortField, 'createdAt');
    console.log(validatedSortField);
    const result = await this.repository.findAll(page, limit, filters, validatedSortField, sortOrder);

    return new PaginatedResultDTO<FlightDTO>(
      result.items.map(flight => new FlightDTO(flight)),
      result.count,
      limit,
      page,
    );
  }

  public async findAllBookmarksByUserId(id: number, pagination: PaginationParamsDTO): Promise<PaginatedResultDTO<FlightDTO>> {
    const result = await this.repository.findBookmarksByUserId(id, pagination.page, pagination.limit);
    return new PaginatedResultDTO<FlightDTO>(
      result.items.map(flight => new FlightDTO(flight)),
      result.count,
      pagination.limit,
      pagination.page,
    );
  }

  public async addFlightToBookmarks(userId: number, flightId: number): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundException('User', userId);
    }

    const flight = await this.repository.findById(flightId);
    if (!flight) {
      throw new EntityNotFoundException('Flight', flightId);
    }

    if (user.bookmarks.some((bookmark) => bookmark.id === flightId)) {
      throw new FlightAlreadyBookmarkedException(flightId);
    }

    user.bookmarks.push(flight);
    await this.usersRepository.save(user);
  }

  public async removeFlightFromBookmarks(userId: number, flightId: number): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundException('User', userId);
    }

    const flightIndex = user.bookmarks.findIndex((bookmark) => bookmark.id === flightId);
    if (flightIndex === -1) {
      throw new EntityNotFoundException('Flight', flightId);
    }

    user.bookmarks.splice(flightIndex, 1);
    await this.usersRepository.save(user);
  }
}
