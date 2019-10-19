import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';

import { FadeUpAnimation } from 'shared/animations';
import { toastSuccess, toastError } from 'shared/toast';
import AsideHeaderClose from 'restmgmt/shared/AsideHeaderClose';
import { LoadingQuery } from 'shared/apollo';
import { Button } from 'shared/buttons';
import { getReservationGql } from 'shared/gql/reservations';
import TableDetailSection from './TableDetailSection';
import GetFloorPlanTableQuery from './GetFloorPlanTableQuery';
import { opName as listReservationsOpName } from 'restmgmt/rsvplist/api.listReservations.query';
import { graphQlOp as editReservationGql } from 'restmgmt/rsvplist/api.editReservation.mutation';
import GetFloorPlanStateQuery from 'restmgmt/shared/GetFloorPlanStateQuery';
import SetFloorPlanSelectedTableMutation from 'restmgmt/shared/SetFloorPlanSelectedTableMutation';

const SelectTableSection = ({reservation, floorPlanTable}) => {
  const hasTable = floorPlanTable != null;

  return (
    <Mutation
      mutation={editReservationGql}
      refetchQueries={[listReservationsOpName]}
    >
      {(update, mutateProps) => {
        const onRequestUpdate = () => {
          const args = {
            variables: {
              input: {
                floor_plan_table_id: floorPlanTable.id,
                id: reservation.id,
              }
            }
          };

          const opQ = update(args)
            .then(() => {
              toastSuccess(`Success! The reservation has been assigned.`);
            })
            .catch((err) => {
              toastError();
            });

          return opQ;
        }

        return (
          <Fragment>
            <FadeUpAnimation>
              <header className="rest-page__aside__res-list-item__header">
                <h4>Table Assignment</h4>
              </header>
              <div className="row padding--24">
                <p className="text--bold">Select Table</p>
                <p className="text--gray-med">
                  Click on a table to view it's details. Then press the assign button. You can update at anytime.
                </p>
                <Button
                  buttonStyle="secondary"
                  size="fl"
                  onClick={() => {
                    if (hasTable) {
                      onRequestUpdate();
                    }
                  }}
                  disabled={!hasTable}
                  >
                    Assign Table{hasTable && ` ${floorPlanTable.table_number}`}
                  </Button>
              </div>
            </FadeUpAnimation>
          </Fragment>
        );
      }}
    </Mutation>
  );
}

const ReservationTableAssign = ({reservation, onClose, floorPlanTable}) => {
  const hasTable = floorPlanTable != null;

  return (
    <SetFloorPlanSelectedTableMutation>
      {({mutation: setFloorPlanSelectedTable}) => (
        <Fragment>
          <AsideHeaderClose
            ariaLabel='back-to-all-reservations'
            text={reservation.customer.name}
            onClickClose={() => {
              setFloorPlanSelectedTable(null)
              .then(() => onClose());
            }}
          />
          <div className="card__overflow-container">
            <div>
              <SelectTableSection
                reservation={reservation}
                floorPlanTable={floorPlanTable}
              />
              {hasTable && (
                <TableDetailSection
                  floorPlanTable={floorPlanTable}
                />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </SetFloorPlanSelectedTableMutation>
  );
};

const QueriedReservationTableAssign = ({
  reservationId,
  onClose,
}) => {
  return (
    <LoadingQuery
      query={getReservationGql}
      variables={{
        id: reservationId
      }}
    >
      {({data: {getReservation: reservation}}) => (
        <GetFloorPlanStateQuery>
          {({data: floorPlanState}) => {
            const tableId = floorPlanState.selectedTableId;

            if (tableId == null) {
              // Return component w/o table.
              return (
                <ReservationTableAssign
                  reservation={reservation}
                  onClose={onClose}
                  table={null}
                />
              );
            }

            // Table ID is present, should be able to retrieve the table.
            return (
              <GetFloorPlanTableQuery tableId={tableId}>
                {({data: floorPlanTable}) => (
                  <ReservationTableAssign
                    reservation={reservation}
                    onClose={onClose}
                    floorPlanTable={floorPlanTable}
                  />
                )}
              </GetFloorPlanTableQuery>
            )
          }}
        </GetFloorPlanStateQuery>
      )}
    </LoadingQuery>
  );
}

export default QueriedReservationTableAssign;
