import { Controller, Get, Query } from '@nestjs/common';
import { FlightsService } from '@flights/flights.service';
import { FlightDTO } from '@flights/dtos/FlightDTO';
import { PaginationParamsDTO } from '@common/dtos/pagination-params.dto';
import { PaginatedResultDTO } from '@common/dtos/paginated-result.dto';
import { FlightFiltersDTO } from '@flights/dtos/flight-filters.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly service: FlightsService) {}

  @Get()
  public async findAll(@Query() paginationParams: PaginationParamsDTO, @Query() filters: FlightFiltersDTO): Promise<PaginatedResultDTO<FlightDTO>> {
    return this.service.findAll(paginationParams, filters);
  }
}
