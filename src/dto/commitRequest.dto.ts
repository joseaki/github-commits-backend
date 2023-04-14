import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUrl } from 'class-validator';
import { PaginationRequestDto } from './paginationRequest.dto';

export class CommitRequestDto extends PaginationRequestDto {
  @Expose()
  @IsOptional()
  @IsString()
  @IsUrl(
    { host_whitelist: [/github/], protocols: ['https'] },
    { message: 'repo must be a github address' },
  )
  @ApiProperty({
    example: 'https://github.com/joseaki/semantic-segmentation-editor',
    description: 'Github url repository',
    required: false,
    default: 10,
  })
  repo?: string;
}
