import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import RestaurantMgmtLayoutAlt from 'shared/layout/RestaurantMgmtLayoutAlt';
import ReservationsHeader from 'restmgmt/rsvplist/ReservationsHeader';
import RsvpGrid from 'restmgmt/rsvpgrid/RsvpGrid';
import { Card } from 'shared/card/Card';

const RsvpGridIndex = ({match}) => {
  return (
    <RestaurantMgmtLayoutAlt
      header={() => (
        <ReservationsHeader />
      )}
      main={() => (
        <Card size="md" cardDark={true} cardOverflow={true}>
          <Switch>
            <Route
              path={`${match.url}`}
              exact
              component={RsvpGrid}
            />
          </Switch>
        </Card>
      )}
    />
  );
};

export default RsvpGridIndex;
