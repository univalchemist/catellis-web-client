import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import GraphQLJSON from 'graphql-type-json';

export const graphQlOp = gql`
  mutation EditRestaurant(
    $id: ID!,
    $name: String,
    $timezone_name: String,
    $rest_close_at: String,
    $rest_open_at: String,
    $online: Boolean,
    $max_party_size: Int,
    $min_party_size: Int,
    $online_days_in_advance: Int,
    $kitchen_pacing: Int,
    $email_confirmation_inhouse: Boolean,
    $email_confirmation_notes: String,
    $email_reminders: Boolean,
    $email_reminder_time: String,
    $notification_email_address: String,
    $created_notification: Boolean,
    $edited_notification: Boolean,
    $cancelled_notification: Boolean,
    $turn_time_1: String,
    $turn_time_2: String,
    $turn_time_3: String,
    $turn_time_4: String,
    $turn_time_5: String,
    $turn_time_6: String,
    $turn_time_7: String,
    $turn_time_8: String,
    $turn_time_9: String,
    $turn_time_10: String,
    $turn_time_11: String,
    $turn_time_12: String,
    $turn_time_13: String,
    $turn_time_14: String,
    $turn_time_15: String,
    $turn_time_16: String,
    $turn_time_17: String,
    $turn_time_18: String,
    $turn_time_19: String,
    $turn_time_20: String,
    $phone_number: String,
    $location: String
  ) {
    editRestaurant(
      id: $id,
      name: $name,
      timezone_name: $timezone_name,
      rest_close_at: $rest_close_at,
      rest_open_at: $rest_open_at,
      online: $online,
      max_party_size: $max_party_size,
      min_party_size: $min_party_size,
      online_days_in_advance: $online_days_in_advance,
      kitchen_pacing: $kitchen_pacing,
      email_confirmation_inhouse: $email_confirmation_inhouse,
      email_confirmation_notes: $email_confirmation_notes,
      email_reminders: $email_reminders,
      email_reminder_time: $email_reminder_time,
      notification_email_address: $notification_email_address
      created_notification: $created_notification
      edited_notification: $edited_notification
      cancelled_notification: $cancelled_notification,
      turn_time_1: $turn_time_1,
      turn_time_2: $turn_time_2,
      turn_time_3: $turn_time_3,
      turn_time_4: $turn_time_4,
      turn_time_5: $turn_time_5,
      turn_time_6: $turn_time_6,
      turn_time_7: $turn_time_7,
      turn_time_8: $turn_time_8,
      turn_time_9: $turn_time_9,
      turn_time_10: $turn_time_10,
      turn_time_11: $turn_time_11,
      turn_time_12: $turn_time_12,
      turn_time_13: $turn_time_13,
      turn_time_14: $turn_time_14,
      turn_time_15: $turn_time_15,
      turn_time_16: $turn_time_16,
      turn_time_17: $turn_time_17,
      turn_time_18: $turn_time_18,
      turn_time_19: $turn_time_19,
      turn_time_20: $turn_time_20,
      phone_number: $phone_number,
      location: $location
    ) {
      id name timezone_name rest_open_at rest_close_at online max_party_size min_party_size online_days_in_advance kitchen_pacing email_confirmation_inhouse email_confirmation_notes email_reminders email_reminder_time notification_email_address created_notification edited_notification cancelled_notification turn_time_1 turn_time_2 turn_time_3 turn_time_4 turn_time_5 turn_time_6 turn_time_7 turn_time_8 turn_time_9 turn_time_10 turn_time_11 turn_time_12 turn_time_13 turn_time_14 turn_time_15 turn_time_16 turn_time_17 turn_time_18 turn_time_19 turn_time_20 phone_number location
    }
  }
`;

export const queryWrapper = (key = 'mutate', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
