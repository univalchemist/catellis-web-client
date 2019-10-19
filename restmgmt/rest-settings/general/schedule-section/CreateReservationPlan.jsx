import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, Mutation } from 'react-apollo';
import * as moment from 'moment-timezone';

import ReservationPlanForm from './ReservationPlanForm';
import StackedSubmitCancelControls from 'shared/form/StackedSubmitCancelControls';
import {
  listDailyReservationPlansOpName,
  createReservationPlanGql,
} from 'shared/gql/reservation-plans';
import { toastSuccess, toastError } from 'shared/toast';
import formValueFormatter from './reservation-plan-form-value-formatter';

const CreateReservationPlan = ({
  reservationPlan,
  onCancel,
  onCreate,
}) => {
  return (
    <ReservationPlanForm
      reservationPlan={reservationPlan}
      onSubmit={onCreate}
      controls={({isSubmitEnabled}) => (
        <StackedSubmitCancelControls
          submitText="Create Plan"
          loadingText="Creating"
          onCancel={onCancel}
          isSubmitEnabled={isSubmitEnabled}
        />
      )}
    />
  );
};

const QueriedCreateReservationPlan = ({match, history}) => {
  const onCancel = () => {
    history.push('/rm/restaurant_settings/general/schedule');
  };

  const selectedDate = moment(match.params.date, 'YYYY-MM-DD');

  return (
    <Mutation
      mutation={createReservationPlanGql}
      refetchQueries={[listDailyReservationPlansOpName]}
    >
      {(createReservationPlan) => {
        const reservationPlan = {
          start_date: match.params.date,
          range_type: 'single',
          priority: 100,
          effective_date_start_at: selectedDate,
          effective_date_end_at: selectedDate,
          reservation_plan_floor_plans: [],
          active_weekday_0: true,
          active_weekday_1: true,
          active_weekday_2: true,
          active_weekday_3: true,
          active_weekday_4: true,
          active_weekday_5: true,
          active_weekday_6: true,
        };
        const originalReservationPlan = {...reservationPlan};

        const onCreate = (values) => {
          const opQ = createReservationPlan({
            variables: {
              input: formValueFormatter(
                values,
                originalReservationPlan,
              )
            }
          });

          opQ
          .then((result) => {
            toastSuccess(`Success! The reservation plan has been created.`);

            const newPlanId = result.data.createReservationPlan.id;
            history.push(`/rm/restaurant_settings/general/schedule/edit/${newPlanId}`);
          })
          .catch(() => {
            toastError();
          })

          return opQ;
        };

        return (
          <CreateReservationPlan
            reservationPlan={reservationPlan}
            onCancel={onCancel}
            onCreate={onCreate}
          />
        );
      }}
    </Mutation>
  );
};

export default compose(withRouter)(QueriedCreateReservationPlan);
