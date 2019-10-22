import React from 'react';
import { compose, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import {graphQlOp as setFloorPlanSelectedTableGql } from 'restmgmt/store/operations/local.setFloorPlanSelectedTable.mutation';

const ReservationDetailLink = ({to, children, history}) => (
  <Mutation mutation={setFloorPlanSelectedTableGql}>
    {(setFloorPlanSelectedTable) => {
      const onClick = (evt) => {
        if (evt && evt.preventDefault) {
          evt.preventDefault();
        }

        const opQ = setFloorPlanSelectedTable({variables:{id: null}})
        .then(() => {
          history.push(to)
        });

        return opQ;
      }

      return (
        <a
          onClick={onClick}
          className="clickable"
        >
          {children}
        </a>
      );
    }}
  </Mutation>
);

export default compose(
  withRouter,
)(ReservationDetailLink);
