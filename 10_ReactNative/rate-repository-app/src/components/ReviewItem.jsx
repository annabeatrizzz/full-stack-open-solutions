import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

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

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'd.M.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{review.user.username}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );
};

export default ReviewItem;
