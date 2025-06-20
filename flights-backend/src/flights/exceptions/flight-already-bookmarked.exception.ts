import { HttpException, HttpStatus } from '@nestjs/common';

export class FlightAlreadyBookmarkedException extends HttpException {
  constructor(flightId: number) {
    super(`Flight with ID ${flightId} is already bookmarked`, HttpStatus.CONFLICT);
  }
}