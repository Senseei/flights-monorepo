import { Injectable } from '@nestjs/common';
import { FlightsRepository } from '@flights/flights.repository';
import { FlightDTO } from '@flights/dtos/FlightDTO';
import { UsersRepository } from '@users/users.repository';
import { EntityNotFoundException } from '@common/exceptions/entity-not-found.exception';
import { FlightAlreadyBookmarkedException } from '@flights/exceptions/flight-already-bookmarked.exception';
import { PaginationParamsDTO } from '@common/dtos/pagination-params.dto';
import { FlightFiltersDTO } from '@flights/dtos/flight-filters.dto';
import { PaginatedResultDTO } from '@common/dtos/paginated-result.dto';

@Injectable()
export class FlightsService {
  constructor(
    private readonly repository: FlightsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async findAll(pagination: PaginationParamsDTO, filters: FlightFiltersDTO): Promise<PaginatedResultDTO<FlightDTO>> {
    const { page, limit } = pagination;
    const result = await this.repository.findAll(page, limit, filters);

    return new PaginatedResultDTO<FlightDTO>(
      result.items.map(flight => new FlightDTO(flight)),
      result.count,
      limit,
      page,
    );
  }

  public async findAllBookmarksByUserId(id: number): Promise<FlightDTO[]> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new EntityNotFoundException('User', id);
    }
    return user.bookmarks.map((it) => new FlightDTO(it));
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
