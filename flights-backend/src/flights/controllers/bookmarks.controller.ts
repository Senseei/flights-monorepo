import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { FlightsService } from '@flights/flights.service';
import { FlightDTO } from '@flights/dtos/FlightDTO';

@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarksController {
  constructor(private readonly service: FlightsService) {}

  @Get()
  public async findAll(@Req() request: any): Promise<FlightDTO[]> {
    return this.service.findAllBookmarksByUserId(parseInt(request.user.id));
  }
}
