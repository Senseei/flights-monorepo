import { Injectable } from '@nestjs/common';
import { FlightsRepository } from '@flights/flights.repository';
import { FlightDTO } from '@flights/dtos/FlightDTO';
import { UsersRepository } from '@users/users.repository';
import { EntityNotFoundException } from '@common/exceptions/entity-not-found.exception';

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
}
