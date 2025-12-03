import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    padding: 10,
  },
  flexClumn: {
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-around',
  },
  boldText: {
    fontWeight: 'bold',
  },
  programmingLanguage: {
    backgroundColor: '#0366d6',
    color: 'white',
    padding: 4,
    width: 100,
    textAlign: 'center',
    },
});

const sizeFormatter = (value) => {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'k';
  }
  return value.toString();
}

const RepositoryItem = ({ item }) => (
  <View>
    <View style={styles.flexRow}>
      <Image source={{uri: item.ownerAvatarUrl}}/>
      <View style={styles.flexClumn}>
        <Text style={styles.boldText}>Full name: {item.fullName}</Text>
        <Text>Description: {item.description}</Text>
      </View>
    </View>

    <Text style={styles.programmingLanguage}>{item.language}</Text>

    <View style={styles.flexRow}>
      <View style={styles.flexClumn}>
         <Text style={styles.boldText}>{item.stargazersCount}</Text>
         <Text>Stars</Text>
      </View>
      <View style={styles.flexClumn}>
         <Text style={styles.boldText}>{sizeFormatter(item.forksCount)}</Text>
         <Text>Forks</Text>
      </View>
      <View style={styles.flexClumn}>
         <Text style={styles.boldText}>{sizeFormatter(item.reviewCount)}</Text>
         <Text>Reviews</Text>
      </View>
      <View style={styles.flexClumn}>
         <Text style={styles.boldText}>{sizeFormatter(item.ratingAverage)}</Text>
         <Text>Rating</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;