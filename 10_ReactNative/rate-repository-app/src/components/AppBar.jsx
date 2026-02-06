import { View, StyleSheet, Pressable, Text, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client/react';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    padding: 20
  },
  text: {
    color: theme.colors.white,
    padding: 10,
  },
  scroll: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const onSignOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
       <ScrollView horizontal style={styles.scroll}>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {data?.me ? (
          <>
            <Link to="/createReview">
              <Text style={styles.text}>Create a review</Text>
            </Link>
            <Link to="/myReviews">
              <Text style={styles.text}>My reviews</Text>
            </Link>
            <Pressable onPress={onSignOut}>
              <Text style={styles.text}>Sign Out</Text>
            </Pressable>
          </>
        ) : (
          <Link to="/signIn">
            <Text style={styles.text}>Sign In</Text>
          </Link>
        )}
      </ScrollView>
    </View>

  )
};

export default AppBar;