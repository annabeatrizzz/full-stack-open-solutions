import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (searchKeyword) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repositories: data?.repositories,
    loading,
    error,
  };
};

export default useRepositories;