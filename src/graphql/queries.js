import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Node {
    repositories {
      edges {
        node {
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

export const GET_USER = gql`
  query Query {
    me {
      id
      username
    }
  }
`;
// other queries...

