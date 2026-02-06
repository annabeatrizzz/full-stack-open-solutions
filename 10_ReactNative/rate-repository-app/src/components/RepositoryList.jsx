import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedValue] = useDebounce(searchKeyword, 500);
  const { repositories } = useRepositories(debouncedValue);

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const handleRepositoryPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleRepositoryPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={{ padding: 10 }}>
          <TextInput
            placeholder="Search repositories"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            style={{
              backgroundColor: '#eee',
              padding: 10,
              borderRadius: 5,
            }}
          />
        </View>
      }
  />
  );
};

export default RepositoryList;
