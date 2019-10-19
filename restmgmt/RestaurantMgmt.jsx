import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import CustomersIndex from 'restmgmt/customers/CustomersIndex';
import RsvpListIndex from 'restmgmt/rsvplist/RsvpListIndex';
import RsvpGridIndex from 'restmgmt/rsvpgrid/RsvpGridIndex';
import RestSettingsIndex from 'restmgmt/rest-settings/RestSettingsIndex';
import Me from 'shared/auth/Me';

class RestaurantMgmt extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route
          path={`${match.url}`}
          exact
        >
          <Redirect to={`${match.url}/rsvp_list`} />
        </Route>
        <Route
          path={`${match.url}/rsvp_list`}
          component={RsvpListIndex}
        />
        <Route
          path={`${match.url}/rsvp_grid`}
          component={RsvpGridIndex}
        />
        <Route
          path={`${match.url}/customers`}
          component={CustomersIndex}
        />
        <Route
          path={`${match.url}/restaurant_settings`}
          component={RestSettingsIndex}
        />
        <Route
          path={`${match.url}/me`}
          component={Me}
        />
      </Switch>
    );
  }
}

export default RestaurantMgmt;
