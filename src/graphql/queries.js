import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Node {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage        
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
  repository(id: $id) {
      id
      fullName
      description
      language
      ownerAvatarUrl
      stargazersCount
      forksCount
      ratingAverage
      reviewCount
      url
  }
}
`;

export const GET_USER = gql`
  query Query {
    me {
      id
      username
    }
  }
`;
// other queries...

