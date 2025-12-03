import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.white,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <Text style={styles.text}>Repositories</Text>
      </Link>
      <Link to="/signIn">
        <Text style={styles.text}>Sign In</Text>
      </Link>
    </View>

  )
};

export default AppBar;