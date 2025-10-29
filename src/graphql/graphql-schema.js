import { gql } from '@apollo/client';

export const GET_USER_PROFILE_QUERY = gql`
  query GetUserProfile($userId: ID!) {
    user(id: $userId) {
      id
      name
      role {
        key
        name
      }
    }
  }
`;