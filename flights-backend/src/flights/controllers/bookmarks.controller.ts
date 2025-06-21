import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { FlightsService } from '@flights/flights.service';
import { FlightDTO } from '@flights/dtos/FlightDTO';
import { PaginatedResultDTO } from '@common/dtos/paginated-result.dto';
import { PaginationParamsDTO } from '@common/dtos/pagination-params.dto';

@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarksController {
  constructor(private readonly service: FlightsService) {}

  @Get()
  public async findAll(@Req() request: any, @Query() paginationParams: PaginationParamsDTO): Promise<PaginatedResultDTO<FlightDTO>> {
    return this.service.findAllBookmarksByUserId(parseInt(request.user.id), paginationParams);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async addFlightToBookmarks(@Req() request: any, @Body() body: { flightId: number }): Promise<void> {
    await this.service.addFlightToBookmarks(parseInt(request.user.id), body.flightId);
  }

  @Delete(':flightId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async removeFlightFromBookmarks(@Req() request: any, @Param("flightId") flightId: number): Promise<void> {
    await this.service.removeFlightFromBookmarks(parseInt(request.user.id), flightId);
  }
}
