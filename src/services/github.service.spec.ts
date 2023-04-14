import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import { HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import { COMMITS_MOCK } from 'src/__mocks__/app.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

jest.mock('@nestjs/axios');

describe('GithubService', () => {
  let githubService: GithubService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvVars: true,
          ignoreEnvFile: true,
          load: [
            () => ({ DEFAULT_GITHUB_REPOSITORY: 'some_encapsulated_value' }),
          ],
        }),
      ],
      providers: [GithubService, HttpService],
    }).compile();

    githubService = module.get<GithubService>(GithubService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('retrieve commits', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(
      of<any>({
        data: COMMITS_MOCK,
      }),
    );
    const commits = await githubService.getCommits(
      10,
      1,
      'https://github.com/joseaki/semantic-segmentation-editor',
    );
    expect(commits).toBeDefined();
    expect(commits.length).toBe(COMMITS_MOCK.length);
  });

  it('should throw an error if there is an invalid url', () => {
    jest.spyOn(httpService, 'get').mockReturnValue(
      of<any>({
        data: COMMITS_MOCK,
      }),
    );

    expect(
      githubService.getCommits(10, 1, 'https://github.com/joseaki'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should throw an error if the http service fails', () => {
    jest.spyOn(httpService, 'get').mockReturnValue(
      throwError(() => ({
        data: 'error',
      })),
    );

    expect(
      githubService.getCommits(
        10,
        1,
        'https://github.com/joseaki/semantic-segmentation-editor',
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
