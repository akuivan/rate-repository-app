import { FlatList, View, Text } from 'react-native';
import { GET_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import MyReviewItem from './MyReviewItem'

const MyReviewsContainer = () => {
    const { loading, error, data } = useQuery(GET_USER, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true },
    });
    
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    // Check if the user is signed in to ensure smooth logout without app crashing
    if (!data || !data.me) {
        return;
    }

    const reviews = data.me.reviews.edges.map(edge => edge.node);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <MyReviewItem review={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
    );
};

export default MyReviewsContainer;