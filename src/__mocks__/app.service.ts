export const COMMITS_MOCK = [
  {
    commit: {
      message: 'commit message',
      author: {
        name: 'author name',
        date: '12-22-23',
      },
    },
    sha: 'sha commit',
    committer: {
      html_url: 'https://github.com/',
    },
  },
  {
    commit: {
      message: 'commit message 2',
      author: {
        name: 'author name 2',
        date: '12-22-24',
      },
    },
    sha: 'sha commit 2',
  },
];

export const AppService = jest.fn().mockReturnValue({
  getListCommits: jest.fn().mockResolvedValue({
    page: 1,
    nextPage: 2,
    itemsPerPage: 10,
    totalItems: 10,
    items: COMMITS_MOCK.map((commit) => {
      return {
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: commit.commit.author.date,
        commit: commit.sha,
        user: commit.committer?.html_url,
      };
    }),
  }),
});
