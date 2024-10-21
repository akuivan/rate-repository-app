import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import routes from '../utils/routes';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
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
    />
  );
};

export default RepositoryList;
