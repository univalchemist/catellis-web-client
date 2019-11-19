import React from 'react';
import { DragDropContext } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import { compose, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import GenericError from 'shared/generic-error/GenericError';
import { GridRow, GridCol } from 'shared/layout/grid';
import DragContainer from './DragContainer';
import CustomDragLayer from './CustomDragLayer';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import TableDetailsAside from './TableDetailsAside';
import FloorPlanAside from './FloorPlanAside';
import { graphQlOp as floorPlanStateGql } from 'restmgmt/store/operations/local.getFloorPlanState.query';
import { graphQlOp as getFloorPlanGql } from 'restmgmt/store/operations/local.getFloorPlan.query';

class FloorPlanEditor extends React.Component {
  render() {
    const floorPlan = this.props.floorPlan;
    let asideContent = (
      <FloorPlanAside
        history={this.props.history}
        floorPlan={floorPlan}
      />
    );

    if (this.props.selectedTableId != null) {
      asideContent = (
        <TableDetailsAside
          id={this.props.selectedTableId}
        />
      );
    }

    return (
      <GridRow className="height--fl--100">
        <GridCol m={3} l={4}>
          {asideContent}
        </GridCol>
        <GridCol m={6} l={8}>
          <div className="rest-page__section rest-page__section--header">
            <DragContainer
              snapToGrid={true}
              id={floorPlan.id}
            />
            <CustomDragLayer snapToGrid={true} />
          </div>
        </GridCol>
      </GridRow>
    );
  }
}

class QueriedFloorPlanEditor extends React.Component {
  render() {
    return (
      <Query query={floorPlanStateGql}>
        {({loading, error, data: floorPlanState}) => {
          if (loading) return (<LoadingIndicator />);
          if (error) {
            console.error(error);
            return (<GenericError />);
          }

          const {selectedTableId, selectedFloorPlanId} = floorPlanState.restMgmtState.floorPlanState;

          return (
            <Query
              query={getFloorPlanGql}
              variables={
                {id: selectedFloorPlanId}
              }
            >
              {({loading, error, data}) => {
                if (loading) return (<LoadingIndicator />);

                return (
                  <FloorPlanEditor
                    selectedTableId={selectedTableId}
                    floorPlan={data.getFloorPlan}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  withRouter,
  DragDropContext(MultiBackend(HTML5toTouch))
)(QueriedFloorPlanEditor);
