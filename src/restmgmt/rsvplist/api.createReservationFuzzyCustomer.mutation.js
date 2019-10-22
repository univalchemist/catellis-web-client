import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const graphQlOp = gql`
  mutation CreateReservationFuzzyCustomerMutation(
    $name: String!,
    $phone_number: String!,
    $party_size: Int!,
    $party_notes: String,
    $scheduled_start_at: String!,
    $reservation_status: String!,
    $employee: String,
    $tags: String
  ) {
    createReservationFuzzyCustomer(
      name: $name,
      phone_number: $phone_number,
      party_size: $party_size,
      party_notes: $party_notes,
      scheduled_start_at: $scheduled_start_at,
      reservation_status: $reservation_status
      employee: $employee,
      tags: $tags
    ) {
      status
      suggested_customers {
        id name phone_number email
      }
      reservation {
        id scheduled_start_at employee
      }
    }
  }
`;

export const queryWrapper = (key = 'data', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
