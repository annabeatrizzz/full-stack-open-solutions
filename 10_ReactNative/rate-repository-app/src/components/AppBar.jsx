import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

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
        <Pressable
              onPress={() => Alert.alert('You pressed the text!')}
            >
              <Text style={styles.text}>Repositories</Text>
            </Pressable>
    </View>

  )
};

export default AppBar;