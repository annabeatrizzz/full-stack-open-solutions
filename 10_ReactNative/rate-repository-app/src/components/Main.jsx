import Constants from 'expo-constants';
import AppBar from './AppBar'
import MyReviews from './MyReviews'
import RepositoryList from './RepositoryList'
import RepositoryDetail from './RepositoryDetail'
import ReviewForm from './ReviewForm'
import { Text, StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:repositoryId" element={<RepositoryDetail />} />
        <Route path="/createReview" element={<ReviewForm />} />
        <Route path="/myReviews" element={<MyReviews />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;