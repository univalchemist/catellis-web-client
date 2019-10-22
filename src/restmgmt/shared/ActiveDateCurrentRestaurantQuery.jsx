import React from 'react';
import gql from 'graphql-tag';
import * as moment from 'moment-timezone';

import LoadingQuery from 'shared/apollo/LoadingQuery';

export const activeDateCurrentRestaurantGql = gql`
  query ActiveDateRestaurant {
    restMgmtState @client {
      id activeDate
    }

    getCurrentRestaurant {
      id name timezone_name rest_open_at rest_close_at
    }
  }
`;

const ActiveDateCurrentRestaurantQuery = ({children}) => (
  <LoadingQuery query={activeDateCurrentRestaurantGql}>
    {({data}) => {
      const activeDate = data.restMgmtState.activeDate;
      const restaurant = data.getCurrentRestaurant;

      const timezoneName = !!restaurant ? restaurant.timezone_name : 'UTC';

      return children({
        restaurant,
        activeDate: moment.tz(activeDate, timezoneName),
        beginningOfDay: moment.tz(activeDate, timezoneName).startOf('day'),
        endOfDay: moment.tz(activeDate, timezoneName).endOf('day'),
      });
    }}
  </LoadingQuery>
);

export default ActiveDateCurrentRestaurantQuery;
