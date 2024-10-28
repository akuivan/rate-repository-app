import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import routes from '../utils/routes';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ orderBy, orderDirection, searchKeyword, renderHeader }) => {
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handlePress = (id) => {
    navigate(routes.singleRepository.replace(':id', id));
  };

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={renderHeader}
    />
  );
};

export default RepositoryList;
