import React, { Component } from 'react';
import { Query } from 'react-apollo';

import GenericError from 'shared/generic-error/GenericError';
import LoadingIndicator from 'shared/loading-indicator';
import { graphQlOp as floorPlanStateGql } from 'restmgmt/store/operations/local.getFloorPlanState.query';
import TableUpcomingReservationSidebar from './TableUpcomingReservationSidebar';

class SidebarToggleWrapper extends Component {
  render() {
    const WrappedComponent = this.props.wrappedComponent;

    return (
      <Query query={floorPlanStateGql}>
        {({loading, error, data: floorPlanState}) => {
          if (loading) return (<LoadingIndicator />);

          if (error) {
            console.error(error);
            return (<GenericError />);
          }

          const {
            selectedTableId,
          } = floorPlanState.restMgmtState.floorPlanState;

          const isTableSelected = selectedTableId != null;

          if (isTableSelected) {
            return (
              <TableUpcomingReservationSidebar tableId={selectedTableId} />
            );
          }

          return (
            <WrappedComponent />
          );
        }}
      </Query>
    );
  }
}

export default SidebarToggleWrapper;
