import { Injectable } from '@nestjs/common';
import { GithubService } from 'src/services/github.service';
import { CommitRequestDto } from './dto/commitRequest.dto';

@Injectable()
export class AppService {
  constructor(private readonly githubService: GithubService) {}

  async getListCommits(params: CommitRequestDto) {
    const { itemsPerPage = 10, page = 1 } = params;
    const commits = await this.githubService.getCommits(
      itemsPerPage,
      page,
      params.repo,
    );
    return {
      page: page,
      nextPage: page + 1,
      itemsPerPage: itemsPerPage,
      totalItems: commits.length,
      items: commits.map((commit) => {
        return {
          message: commit.commit.message,
          author: commit.commit.author.name,
          date: commit.commit.author.date,
          commit: commit.sha,
          user: commit.committer?.html_url,
        };
      }),
    };
  }
}
