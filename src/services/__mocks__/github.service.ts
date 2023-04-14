import { COMMITS_MOCK } from 'src/__mocks__/app.service';

export const GithubService = jest.fn().mockReturnValue({
  getCommits: jest.fn().mockResolvedValue(COMMITS_MOCK),
});
