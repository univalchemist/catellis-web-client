import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const graphQlOp = gql`
  mutation EditReservationMutation(
    $input: EditReservationInput!
  ) {
    editReservation(
      input: $input
    ) {
      id, scheduled_start_at, party_size, reservation_status, tags, override_turn_time
      customer {id, name, phone_number, tags}
      floor_plan_table { id table_number }
    }
  }
`;

export const queryWrapper = (key = 'data', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
