import { gql } from '@apollo/client';

export const GET_HELLO_GREETING_QUERY = gql`
  query GetHelloGreeting($name: String!) {
    helloGreeting(name: $name) {
      message
    }
  }
`;