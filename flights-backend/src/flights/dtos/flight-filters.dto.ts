import { IsDate, IsOptional, IsString } from 'class-validator';

export class FlightFiltersDTO {
  @IsOptional()
  @IsString()
  origin?: string;
  @IsOptional()
  @IsString()
  destination?: string;
  @IsOptional()
  @IsDate()
  departure?: Date;
  @IsOptional()
  @IsDate()
  arrival?: Date;
}