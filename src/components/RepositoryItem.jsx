import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
});

const RepositoryItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Full name: {item.fullName}</Text>
        <Text style={styles.description}>Description: {item.description}</Text>
        <Text style={styles.language}>Language: {item.language}</Text>
        <Text style={styles.stargazersCount}>Stars: {item.stargazersCount}</Text>
        <Text style={styles.forksCount}>Forks: {item.forksCount}</Text>
        <Text style={styles.reviewCount}>Reviews: {item.reviewCount}</Text>
        <Text style={styles.ratingAverage}>Ratings: {item.ratingAverage}</Text>
      </View>
    );
};

export default RepositoryItem;