import React from 'react';

import ActiveDateCurrentRestaurantQuery from './ActiveDateCurrentRestaurantQuery';
import ListDailyReservationPlansQuery from './ListDailyReservationPlansQuery';

const ActiveDateReservationPlansQuery = ({
  children,
}) => (
  <ActiveDateCurrentRestaurantQuery>
    {({restaurant, activeDate, beginningOfDay, endOfDay}) => (
      <ListDailyReservationPlansQuery
        searchStart={beginningOfDay}
        searchEnd={endOfDay}
      >
        {({data: dailyReservationPlans}) => {
          return children({
            restaurant,
            activeDate,
            beginningOfDay,
            endOfDay,
            dailyReservationPlans,
          });
        }}
      </ListDailyReservationPlansQuery>
    )}
  </ActiveDateCurrentRestaurantQuery>
);

export default ActiveDateReservationPlansQuery;
