import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { PaginationRequestDto } from 'src/dto/paginationRequest.dto';
import { ValidatePipe } from 'src/Pipes/validate-body.pipe';
import { TransformResponseInterceptor } from './Interceptors/transform-response.interceptor';
import { ConvertResponseToDtoInterceptor } from './Interceptors/convert-response-to-dto.interceptor';
import { CommitResponseDto } from 'src/dto/commitResponse.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @UseInterceptors(new ConvertResponseToDtoInterceptor(CommitResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  getCommits(@Query(new ValidatePipe()) itemsPerPage: PaginationRequestDto) {
    return this.appService.getListCommits(itemsPerPage);
  }
}
