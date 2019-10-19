import React from 'react';
import { compose } from 'react-apollo';

import FloorPlanEditor from './FloorPlanEditor';
import setEditorFloorPlanWrapper from 'restmgmt/store/operations/local.setEditorFloorPlan.mutation';
import LoadingIndicator from 'shared/loading-indicator';

export class CreateFloorPlan extends React.Component {
  state = {
    isLoading: true
  }

  componentWillMount() {
    const floorPlan = {
      __typename: 'FloorPlan',
      id: 'new',
      name: '',
      floor_plan_tables: []
    };

    this.setState({isLoading: true});
    const opQ = this.props.setEditorFloorPlan({variables: {input: floorPlan}});
    opQ
      .then(() => this.setState({isLoading: false}))
  }

  render () {
    if (this.state.isLoading) {
      return (
        <LoadingIndicator />
      );
    }

    return (
      <FloorPlanEditor
        id="new"
      />
    );
  }
}

export default compose(
  setEditorFloorPlanWrapper('setEditorFloorPlan'),
)(CreateFloorPlan);
