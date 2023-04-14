import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CommitData } from 'src/interfaces/commit.interface';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  async getCommits(
    itemsPerPage = 10,
    page = 1,
    customRepo = process.env.DEFAULT_GITHUB_REPOSITORY,
  ): Promise<CommitData[]> {
    try {
      const items = customRepo.split('#')[0].split('/');
      if (items.length < 5 || items.length - 1 < 0 || items.length - 2 < 0) {
        throw new BadRequestException('Malformed url repository');
      }

      const user = items[3];
      const repoName = items[4];
      const request$ = this.httpService.get<CommitData[]>(
        `/repos/${user}/${repoName}/commits`,
        {
          baseURL: 'https://api.github.com',
          params: {
            per_page: itemsPerPage,
            page,
          },
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        },
      );
      const response = await lastValueFrom(request$);
      return response.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new NotFoundException('Repository does not exist');
    }
  }
}
