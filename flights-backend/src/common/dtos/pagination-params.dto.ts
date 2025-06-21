import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationParamsDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page = 1;
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit = 10;
}