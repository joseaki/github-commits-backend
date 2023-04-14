import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsOptional } from 'class-validator';

export class PaginationRequestDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    example: 2,
    description: 'Items per page',
    required: false,
    default: 10,
  })
  itemsPerPage: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'Page to retrieve',
    required: false,
    default: 1,
  })
  page: number;
}
