import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginatedResponseDto<T> {
  @ApiProperty({ example: '1', description: 'current page number' })
  @Expose()
  page: number;

  @ApiProperty({ example: '2', description: 'next page number' })
  @Expose()
  nextPage: number;

  @ApiProperty({
    example: '50',
    description: 'current number of items per page requested',
  })
  @Expose()
  itemsPerPage: number;

  @ApiProperty({
    example: '50',
    description: 'current number of items in the list',
  })
  @Expose()
  totalItems: number;

  @ApiProperty({
    example: '[]',
    description: 'array of paginated items',
  })
  @Expose()
  items: T[];
}
