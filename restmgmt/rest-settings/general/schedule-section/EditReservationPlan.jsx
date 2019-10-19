import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, Mutation } from 'react-apollo';
import * as moment from 'moment-timezone';

import ReservationPlanForm from './ReservationPlanForm';
import StackedSubmitCancelControls from 'shared/form/StackedSubmitCancelControls';
import { toastSuccess, toastError } from 'shared/toast';
import {
  getReservationPlanGql,
  destroyReservationPlanGql,
  listDailyReservationPlansOpName,
  editReservationPlanGql,
} from 'shared/gql/reservation-plans';
import LoadingQuery from 'shared/apollo/LoadingQuery';
import formValueFormatter from './reservation-plan-form-value-formatter';

const EditReservationPlan = ({
  reservationPlan,
  onCancel,
  onDelete,
  onUpdate,
}) => {
  const reservationPlanFormValues = {...reservationPlan};

  const effectiveDateStart = moment(reservationPlanFormValues.effective_date_start_at);
  const effectiveDateEnd = moment(reservationPlanFormValues.effective_date_end_at);
  if (effectiveDateStart.isSame(effectiveDateEnd, 'day')) {
    reservationPlanFormValues.range_type = 'single';
  } else {
    reservationPlanFormValues.range_type = 'range';
  }

  return (
    <ReservationPlanForm
      reservationPlan={reservationPlanFormValues}
      onSubmit={onUpdate}
      controls={({isSubmitEnabled}) => (
        <StackedSubmitCancelControls
          submitText="Save Changes"
          loadingText="Updating"
          isSubmitEnabled={isSubmitEnabled}
          onCancel={onCancel}
          isDeletable={true}
          onDelete={onDelete}
        />
      )}
    />
  );
};

const QueriedEditReservationPlan = ({match, history}) => {
  const onCancel = () => {
    history.push('/rm/restaurant_settings/general/schedule');
  };

  return (
    <LoadingQuery
      query={getReservationPlanGql}
      variables={{
        id: match.params.id
      }}
    >
      {({data})=>{
        const reservationPlan = data.getReservationPlan;
        const originalReservationPlan = {...reservationPlan};

        return (
          <Mutation
            mutation={editReservationPlanGql}
            refetchQueries={[listDailyReservationPlansOpName]}
          >
            {(editReservationPlan) => {
              const onUpdate = (values) => {
                const opQ = editReservationPlan({
                  variables: {
                    input: formValueFormatter(
                      values,
                      originalReservationPlan,
                    )
                  }
                });

                opQ
                .then(() => {
                  toastSuccess(`Success! The reservation plan has been updated.`);
                })
                .catch(() => {
                  toastError();
                })

                return opQ;
              };

              return (
                <Mutation
                  mutation={destroyReservationPlanGql}
                  refetchQueries={[listDailyReservationPlansOpName]}
                >
                  {(destroyReservationPlan) => {
                    const onDelete = () => {
                      const opQ = destroyReservationPlan({variables: {id: reservationPlan.id}});

                      opQ
                      .then(() => {
                        toastSuccess(`Success! The reservation plan has been deleted.`);

                        history.push('/rm/restaurant_settings/general/schedule');
                      })
                      .catch(() => {
                        toastError();
                      })

                      return opQ;
                    };

                    return (
                      <EditReservationPlan
                        reservationPlan={reservationPlan}
                        onCancel={onCancel}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                      />
                    );
                  }}
                </Mutation>
              );
            }}
          </Mutation>
        );
      }}
    </LoadingQuery>
  );
};

export default compose(withRouter)(QueriedEditReservationPlan);
