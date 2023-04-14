import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubService } from './services/github.service';
import { BadRequestException, HttpException } from '@nestjs/common';

jest.mock('./services/github.service');
jest.mock('./app.service');

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let githubService: GithubService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, GithubService],
    }).compile();

    appController = app.get<AppController>(AppController);
    githubService = app.get<GithubService>(GithubService);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return a list of commits"', () => {
      expect(
        appController.getCommits({ itemsPerPage: 10, page: 1 }),
      ).resolves.toEqual(
        expect.objectContaining({
          itemsPerPage: expect.any(Number),
          page: expect.any(Number),
          nextPage: expect.any(Number),
          totalItems: expect.any(Number),
          items: expect.any(Array),
        }),
      );
    });

    it('should throw an error if getListCommits  fails', () => {
      jest
        .spyOn(appService, 'getListCommits')
        .mockRejectedValueOnce(new BadRequestException('error'));
      expect(
        appController.getCommits({ itemsPerPage: 10, page: 1 }),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });
});
