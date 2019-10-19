import gql from 'graphql-tag';

export const getMarketingRestaurantOpName = 'GetMarketingRestaurant';
export const getMarketingRestaurantGql = gql`
  query ${getMarketingRestaurantOpName} {
    getMarketingRestaurant {
      id name timezone_name rest_open_at rest_close_at online max_party_size min_party_size online_days_in_advance kitchen_pacing
    }
  }
`;
