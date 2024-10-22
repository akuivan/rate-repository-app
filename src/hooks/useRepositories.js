import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection) => {
  // This is needed for lowest rated repositories, because Picker can't handle two labels with same values
  if (orderBy.includes('RATING_AVERAGE')) {
    orderBy = 'RATING_AVERAGE';
  }
  
  const { data } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,        
      orderDirection,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repositories: data ? data.repositories : { edges: [] }
  };
};

export default useRepositories;
