import { StyleSheet, View } from 'react-native';
import theme from './theme';
import Avatar from './Avatar';
import RepositoryItemDetails from './RepositoryItemDetails';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flexDirection: 'row',
    flexShrink: 1,
    padding: 8,
    backgroundColor: theme.colors.whiteText
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Avatar uri={item.ownerAvatarUrl}/>
      <RepositoryItemDetails item={item} />
    </View>
  );
};

export default RepositoryItem;