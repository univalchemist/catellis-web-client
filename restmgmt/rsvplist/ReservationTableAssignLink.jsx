import React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import SetFloorPlanSelectedTableMutation from 'restmgmt/shared/SetFloorPlanSelectedTableMutation';

const ReservationTableAssignLink = ({
  reservation,
  children,
  history,
}) => {
  const toUrl = `/rm/rsvp_list/reservation/${reservation.id}/assign_table`;

  return (
    <SetFloorPlanSelectedTableMutation>
      {({mutation: setFloorPlanSelectedTable}) => {
        const onClick = (evt) => {
          if (evt && evt.preventDefault) {
            evt.preventDefault();
          }

          const floorPlanTableId = !!reservation.floor_plan_table
            ? reservation.floor_plan_table.id
            : reservation.floor_plan_table_id;

          const opQ = setFloorPlanSelectedTable(floorPlanTableId)
            .then(() => {
              history.push(toUrl)
            });

          return opQ;
        };

        return children({onClick});
      }}
    </SetFloorPlanSelectedTableMutation>
  );
};

export default compose(
  withRouter,
)(ReservationTableAssignLink);
