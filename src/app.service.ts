import { Injectable, NotFoundException } from '@nestjs/common';
import { GithubService } from 'src/services/github.service';
import { CommitRequestDto } from './dto/commitRequest.dto';

@Injectable()
export class AppService {
  constructor(private readonly githubService: GithubService) {}

  async getListCommits(params: CommitRequestDto) {
    const commits = await this.githubService.getCommits(
      params.itemsPerPage,
      params.page,
      params.repo,
    );
    return {
      page: params.page,
      nextPage: params.page + 1,
      itemsPerPage: params.itemsPerPage,
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
