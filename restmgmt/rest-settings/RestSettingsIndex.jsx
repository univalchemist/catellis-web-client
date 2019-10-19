import * as React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import RestaurantMgmtLayout from 'shared/layout/RestaurantMgmtLayout';
import Header from 'restmgmt/rest-settings/Header';

import GeneralInformationIndex from 'restmgmt/rest-settings/general/GeneralInformationIndex';
import FloorPlansIndex from 'restmgmt/rest-settings/floor-plans/FloorPlansIndex';

class RestSettingsIndex extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <RestaurantMgmtLayout
        header={() => (
          <Header />
        )}
        main={() => (
          <Switch>
            <Route
              path={`${match.url}`}
              exact
            >
              <Redirect to={`${match.url}/general`} />
            </Route>
            <Route
              path={`${match.url}/general`}
              component={GeneralInformationIndex}
            />
            <Route
              path={`${match.url}/floor_plans`}
              component={FloorPlansIndex}
            />
          </Switch>
        )}
      />
    );
  }
}

export default RestSettingsIndex;
