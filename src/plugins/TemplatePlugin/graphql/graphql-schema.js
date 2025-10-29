import { gql } from '@apollo/client';

export const EXAMPLE_QUERY = gql`
  query getExample {
    getExample {
      message
      value
    }
  }
`;