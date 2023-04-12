import { Injectable } from '@nestjs/common';
import { GithubService } from 'src/services/github.service';
import { PaginationRequestDto } from 'src/dto/paginationRequest.dto';

@Injectable()
export class AppService {
  constructor(private readonly githubService: GithubService) {}

  async getListCommits(params: PaginationRequestDto) {
    const commits = await this.githubService.getCommits(
      params.itemsPerPage,
      params.page,
    );
    return commits.map((commit) => {
      return {
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: commit.commit.author.date,
      };
    });
  }
}
