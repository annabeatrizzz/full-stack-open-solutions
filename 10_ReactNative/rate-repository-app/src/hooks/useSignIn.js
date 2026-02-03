import { AUTHENTICATE } from '../graphql/queries';
import { useMutation, useApolloClient } from '@apollo/client/react';
import { useContext } from 'react';
import AuthStorageContext from '../AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const mutationResult = await mutate({ variables: { credentials: { username, password } } });

    const accessToken = mutationResult?.data?.authenticate?.accessToken;

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();
    }

    return mutationResult;
  };

  return [signIn, result];
};

export default useSignIn;
