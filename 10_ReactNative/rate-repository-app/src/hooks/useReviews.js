import { useQuery } from '@apollo/client/react';
import { GET_REVIEWS, CREATE_REVIEW } from '../graphql/queries';

const useReviews = () => {
  const { data } = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    reviews: data?.reviews,
  };
};

export default useReviews;