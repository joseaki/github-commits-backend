import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CommitData } from 'src/interfaces/commit.interface';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  async getCommits(itemsPerPage = 10, page = 1): Promise<CommitData[]> {
    const request$ = this.httpService.get<CommitData[]>(
      '/repos/joseaki/semantic-segmentation-editor/commits',
      {
        baseURL: 'https://api.github.com',
        params: {
          per_page: itemsPerPage,
          page,
        },
      },
    );
    const response = await lastValueFrom(request$);
    return response.data;
  }
}
