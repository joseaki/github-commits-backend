import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { GithubService } from './services/github.service';
import { BadRequestException, HttpException } from '@nestjs/common';

jest.mock('./services/github.service');

describe('AppService', () => {
  let appService: AppService;
  let githubService: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService, GithubService],
    }).compile();

    appService = module.get<AppService>(AppService);
    githubService = module.get<GithubService>(GithubService);
  });

  it('should return a list of commits', async () => {
    const commits = await appService.getListCommits({
      page: 1,
      itemsPerPage: 10,
    });
    expect(commits).toEqual(
      expect.objectContaining({
        itemsPerPage: expect.any(Number),
        page: expect.any(Number),
        nextPage: expect.any(Number),
        totalItems: expect.any(Number),
        items: expect.any(Array),
      }),
    );
  });

  it('should throw an error if githubService  fails', () => {
    jest
      .spyOn(githubService, 'getCommits')
      .mockRejectedValueOnce(new BadRequestException('error'));
    expect(
      appService.getListCommits({ itemsPerPage: 10, page: 1 }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
