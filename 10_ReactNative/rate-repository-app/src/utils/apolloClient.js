import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

/*const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: Constants.expoConfig.extra.ApolloUri,
    }),
    cache: new InMemoryCache(),
  });
};*/

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: new HttpLink({
      uri: Constants.expoConfig.extra.ApolloUri,
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;