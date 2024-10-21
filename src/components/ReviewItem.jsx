import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  ratingText: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewerDetails: {
    flexDirection: 'column',
  },
  dateText: {
    color: 'textSecondary',
    marginTop: 2,
  },
  reviewText: {
    marginTop: 5,
    marginLeft: 50,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.reviewerContainer}>
        <View style={styles.circle}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewerDetails}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text style={styles.dateText}>
            {new Date(review.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );
};

export default ReviewItem;
