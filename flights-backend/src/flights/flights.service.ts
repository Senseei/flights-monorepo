import { Injectable } from '@nestjs/common';
import { FlightsRepository } from '@flights/flights.repository';
import { FlightDTO } from '@flights/dtos/FlightDTO';
import { UsersRepository } from '@users/users.repository';
import { EntityNotFoundException } from '@common/exceptions/entity-not-found.exception';
import { FlightAlreadyBookmarkedException } from '@flights/exceptions/flight-already-bookmarked.exception';

@Injectable()
export class FlightsService {
  constructor(
    private readonly repository: FlightsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async findAll(): Promise<FlightDTO[]> {
    return (await this.repository.findAll()).map((it) => new FlightDTO(it));
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
