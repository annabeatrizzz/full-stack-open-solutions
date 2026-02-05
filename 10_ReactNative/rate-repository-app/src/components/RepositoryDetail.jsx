import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#e1e4e8',
  },
});

const RepositoryDetail = () => {
  const { repositoryId } = useParams();
  
  console.log('RepositoryDetail - repositoryId:', repositoryId);
  
  const { data: repositoryData, loading: repositoryLoading, error: repositoryError } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network',
  });

  console.log('RepositoryDetail repositoryData:', repositoryData);
  console.log('RepositoryDetail repositoryError:', repositoryError);

  const [order, setOrder] = useState('latest'); // 'latest' | 'highest' | 'lowest'

  const reviewVariables = (() => {
    const baseVars = { repositoryId, first: 10 };
    if (order === 'latest') return { ...baseVars, orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    if (order === 'highest') return { ...baseVars, orderBy: 'RATING', orderDirection: 'DESC' };
    return { ...baseVars, orderBy: 'RATING', orderDirection: 'ASC' };
  })();

  const { data: reviewsData, loading: reviewsLoading, error: reviewsError } = useQuery(GET_REVIEWS, {
    variables: reviewVariables,
    fetchPolicy: 'cache-and-network',
  });

  if (repositoryLoading || reviewsLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  if (repositoryError || reviewsError) {
    console.log('Repository Error:', repositoryError?.message);
    console.log('Reviews Error:', reviewsError?.message);
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Error loading repository</Text>
        <Text style={styles.errorText}>{repositoryError?.message || reviewsError?.message}</Text>
      </View>
    );
  }

  const repository = repositoryData?.repository;
  const reviews = reviewsData?.repository?.reviews?.edges?.map(edge => edge.node) || [];

  if (!repository) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Repository not found</Text>
      </View>
    );
  }

  const ListHeader = () => (
    <View>
      <RepositoryItem item={repository} showGitHubButton={true} />
      <View style={styles.separator} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#fff' }}>
        <Pressable onPress={() => setOrder('latest')}>
          <Text style={{ color: order === 'latest' ? '#0366d6' : '#000' }}>Latest</Text>
        </Pressable>
        <Pressable onPress={() => setOrder('highest')}>
          <Text style={{ color: order === 'highest' ? '#0366d6' : '#000' }}>Highest rated</Text>
        </Pressable>
        <Pressable onPress={() => setOrder('lowest')}>
          <Text style={{ color: order === 'lowest' ? '#0366d6' : '#000' }}>Lowest rated</Text>
        </Pressable>
      </View>
      <View style={styles.separator} />
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={<ListHeader />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default RepositoryDetail;
