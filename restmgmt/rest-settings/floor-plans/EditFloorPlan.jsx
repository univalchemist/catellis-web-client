import React from 'react';
import { compose, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import GenericError from 'shared/generic-error/GenericError';
import FloorPlanEditor from './FloorPlanEditor';
import {graphQlOp as getFloorPlanGql} from 'restmgmt/rest-settings/floor-plans/api.getFloorPlan.query';
import setEditorFloorPlanWrapper from 'restmgmt/store/operations/local.setEditorFloorPlan.mutation';
import LoadingIndicator from 'shared/loading-indicator';

export class EditFloorPlan extends React.Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    const opQ = this.props.setEditorFloorPlan({
      variables: {
        input: this.props.floorPlan
      }
    });

    opQ.then(() => {
      this.setState({isLoading: false})
    });
  }

  render () {
    if (this.state.isLoading) {
      return (<LoadingIndicator />);
    }

    return (
      <FloorPlanEditor
        id={this.props.floorPlan.id}
      />
    );
  }
}

const WrappedEditFloorPlan = compose(
  setEditorFloorPlanWrapper('setEditorFloorPlan'),
)(EditFloorPlan);

const QueriedEditFloorPlan = ({match}) => {
  return (
    <Query
      query={getFloorPlanGql}
      variables={{
        id: match.params.id
      }}
    >
      {({loading, error, data: {getFloorPlan: floorPlan}}) => {
        if (loading) return (<LoadingIndicator />);

        if (error) {
          console.error(error);
          return (<GenericError />);
        }

        return (
          <WrappedEditFloorPlan floorPlan={floorPlan} />
        );
      }}
    </Query>
  );
};

export default compose(
  withRouter,
)(QueriedEditFloorPlan);
