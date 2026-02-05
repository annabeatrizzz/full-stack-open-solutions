import { render, screen, within } from '@testing-library/react-native';
import RepositoryList from '../../src/components/RepositoryList';

// Mock the useRepositories hook
jest.mock('../../src/hooks/useRepositories', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Setup the mock
      const useRepositories = require('../../src/hooks/useRepositories').default;
      useRepositories.mockReturnValue({
        repositories,
      });

      render(<RepositoryList />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      // Test first repository
      within(firstRepositoryItem).getByText(/jaredpalmer\/formik/);
      within(firstRepositoryItem).getByText(/Build forms in React, without the tears/);
      within(firstRepositoryItem).getByText('TypeScript');
      within(firstRepositoryItem).getByText('Stars');
      within(firstRepositoryItem).getByText('21856');
      within(firstRepositoryItem).getByText('1.6k');
      within(firstRepositoryItem).getByText('Forks');
      within(firstRepositoryItem).getByText('3');
      within(firstRepositoryItem).getByText('Reviews');
      within(firstRepositoryItem).getByText('88');
      within(firstRepositoryItem).getByText('Rating');

      // Test second repository
      within(secondRepositoryItem).getByText(/async-library\/react-async/);
      within(secondRepositoryItem).getByText(/Flexible promise-based React data loader/);
      within(secondRepositoryItem).getByText('JavaScript');
      within(secondRepositoryItem).getByText('Stars');
      within(secondRepositoryItem).getByText('1760');
      within(secondRepositoryItem).getByText('69');
      within(secondRepositoryItem).getByText('Forks');
      within(secondRepositoryItem).getByText('3');
      within(secondRepositoryItem).getByText('Reviews');
      within(secondRepositoryItem).getByText('72');
      within(secondRepositoryItem).getByText('Rating');
    });
  });
});
