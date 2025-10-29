import { gql } from '@apollo/client';

export const GET_COUNTRY_QUERY = gql`
query Country($code: ID!) {
  country(code: $code) {
    name
    capital
    currency
  }
}
`;