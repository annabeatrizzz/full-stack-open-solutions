import { View, StyleSheet, Pressable, Text, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signIn">
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>

  )
};

export default AppBar;