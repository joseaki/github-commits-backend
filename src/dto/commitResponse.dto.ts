import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommitResponseDto {
  @ApiProperty({ example: 'First commit', description: 'commit message' })
  @Expose()
  message: string;

  @ApiProperty({ example: 'Antonio', description: 'commit author' })
  @Expose()
  author: string;

  @ApiProperty({ example: '2021-07-29T12:52:37Z', description: 'commit date' })
  @Expose()
  date: Date;

  @ApiProperty({ example: '08db77c', description: 'commit sha' })
  @Expose()
  commit: string;

  @ApiProperty({ example: 'joseaki', description: 'github username' })
  @Expose()
  user: string;
}
