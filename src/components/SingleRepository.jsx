import React from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import { View, Text } from 'react-native';

const SingleRepository = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <RepositoryItem repository={data.repository} showGithubButton={true} />
    </View>
  );
};

export default SingleRepository;
