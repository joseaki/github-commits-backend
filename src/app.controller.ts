import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidatePipe } from 'src/Pipes/validate-body.pipe';
import { TransformResponseInterceptor } from './Interceptors/transform-response.interceptor';
import { ConvertResponseToDtoInterceptor } from './Interceptors/convert-response-to-dto.interceptor';
import { CommitResponseDto } from 'src/dto/commitResponse.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedResponseDto } from './dto/paginatedResponse.dto';
import { CommitRequestDto } from './dto/commitRequest.dto';

@Controller()
@ApiTags('Github service')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('commits')
  @ApiResponse({
    status: 201,
    type: CommitResponseDto,
    description: 'List of commits from repository',
  })
  @ApiOperation({
    summary: 'Get repository commits',
    description: 'This endpoint is used to retrieve repository commits.',
  })
  @UseInterceptors(
    new ConvertResponseToDtoInterceptor(
      PaginatedResponseDto<CommitResponseDto>,
    ),
  )
  @UseInterceptors(TransformResponseInterceptor)
  getCommits(@Query(new ValidatePipe()) params: CommitRequestDto) {
    console.log('HEERRER');
    return this.appService.getListCommits(params);
  }
}
