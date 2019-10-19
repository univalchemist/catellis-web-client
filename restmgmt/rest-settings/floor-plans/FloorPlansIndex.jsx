import * as React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import CreateFloorPlan from './CreateFloorPlan';
import EditFloorPlan from './EditFloorPlan';

class FloorPlansIndex extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route
          path={`${match.url}/create`}
          exact
          component={CreateFloorPlan}
        />
        <Route
          path={`${match.url}/:id`}
          exact
          component={EditFloorPlan}
        />
      </Switch>
    );
  }
}

export default FloorPlansIndex;
