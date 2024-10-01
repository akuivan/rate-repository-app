import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from './theme';
import formatCount from './formatCount';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  languageTag: {
    backgroundColor: theme.colors.primary, 
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  languageTagTextColor: {
    color: theme.colors.whiteText,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  detailText: {
    alignItems: 'center',
    marginRight: 15,
    justifyContent: 'center',
  },
});

const RepositoryItemDetails = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text fontSize='subheading' fontWeight='bold'>{item.fullName}</Text>
      <Text color='textSecondary'>{item.description}</Text>
      <View style={styles.languageTag}>
        <Text style={styles.languageTagTextColor}>{item.language}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailText}>
          <Text fontWeight='bold'>{formatCount(item.stargazersCount)}</Text>
          <Text color='textSecondary'>Stars</Text>
        </View>
        <View style={styles.detailText}>
          <Text fontWeight='bold'>{formatCount(item.forksCount)}</Text>
          <Text color='textSecondary'>Forks</Text>
        </View>
        <View style={styles.detailText}>
          <Text fontWeight='bold'>{item.reviewCount}</Text>
          <Text color='textSecondary'>Reviews</Text>
        </View>
        <View style={styles.detailText}>
          <Text fontWeight='bold'>{item.ratingAverage}</Text>
          <Text color='textSecondary'>Ratings</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItemDetails;
