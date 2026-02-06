import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = (includeReviews = false) => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return {
    currentUser: data?.me,
    loading,
    error,
  };
};

export default useCurrentUser;
