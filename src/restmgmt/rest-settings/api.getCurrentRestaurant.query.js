import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'GetCurrentRestaurant';
export const graphQlOp = gql`
  query ${opName} {
    getCurrentRestaurant {
      id name timezone_name rest_open_at rest_close_at online max_party_size min_party_size online_days_in_advance kitchen_pacing email_confirmation_inhouse email_confirmation_notes email_reminders email_reminder_time notification_email_address created_notification edited_notification cancelled_notification turn_time_1 turn_time_2 turn_time_3 turn_time_4 turn_time_5 turn_time_6 turn_time_7 turn_time_8 turn_time_9 turn_time_10 turn_time_11 turn_time_12 turn_time_13 turn_time_14 turn_time_15 turn_time_16 turn_time_17 turn_time_18 turn_time_19 turn_time_20 phone_number location
    }
  }
`;

export const queryWrapper = (key = 'query', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
