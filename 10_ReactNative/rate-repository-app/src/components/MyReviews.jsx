import { FlatList, View, Text, StyleSheet } from 'react-native';
import useCurrentUser from '../hooks/useCurrentUser';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0366d6',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    color: '#666',
    fontSize: 12,
  },
  reviewText: {
    color: '#333',
    lineHeight: 20,
  },
});

const MyReviews = () => {
  const { currentUser, loading } = useCurrentUser(true);

  if (loading) return <Text>Loading...</Text>;

  const reviews = currentUser?.reviews?.edges.map(edge => edge.node) ?? [];

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.flexRow}>
            <View style={styles.header}>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.rating}</Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.username}>{item.text}</Text>
                <Text style={styles.date}>
                {new Date(item.createdAt).toLocaleDateString()}
                </Text>
            </View>
            </View>
        </View>
        )}
    />
  );
};

export default MyReviews;
