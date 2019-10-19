import React from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import * as moment from 'moment-timezone';

import ScheduleSettingsFormSegment from './ScheduleSettingsFormSegment';
import { listFloorPlansGql } from 'shared/gql/floor-plans';
import { LoadingQuery } from 'shared/apollo';
import createDecorator from 'final-form-calculate';

const todayMoment = (changeValue, allValues ) => {
  if (allValues.start_date != null && moment(allValues.start_date, 'YYYY-MM-DD').isValid()) {
    return moment(allValues.start_date, 'YYYY-MM-DD');
  }

  return moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD');
}

/*
  FIXME:
    * X Populate type
    * Redirect after create
*/

const formValuesDecorator = createDecorator(
  {
    field: 'repeat',
    updates: {
      'effective_date_start_at': todayMoment,
      'effective_date_end_at': todayMoment,
    }
  },
  {
    field: 'range_type',
    updates: {
      'effective_date_start_at': todayMoment,
      'effective_date_end_at': todayMoment,
      'active_weekday_0': (changeValue, allValues) => true,
      'active_weekday_1': (changeValue, allValues) => true,
      'active_weekday_2': (changeValue, allValues) => true,
      'active_weekday_3': (changeValue, allValues) => true,
      'active_weekday_4': (changeValue, allValues) => true,
      'active_weekday_5': (changeValue, allValues) => true,
      'active_weekday_6': (changeValue, allValues) => true,
    }
  },
  {
    field: 'effective_date_start_at',
    updates: {
      'effective_date_end_at': (changeValue, allValues) => {
        const effectiveDateStart = moment(allValues.effective_date_start_at);
        const effectiveDateEnd = moment(allValues.effective_date_end_at);

        if (effectiveDateStart.isAfter(effectiveDateEnd)) {
          return effectiveDateStart;
        }

        return effectiveDateEnd;
      },
    }
  },
);

const formValidator = (formValues) => {
  const errors = {};

  if (formValues.reservation_plan_floor_plans.length < 1) {
    errors.floorPlansCount = "Must have at least one floor plan";
  }

  const effectiveDateStart = moment(formValues.effective_date_start_at);
  const effectiveDateEnd = moment(formValues.effective_date_end_at);
  if (effectiveDateStart.isValid() && effectiveDateEnd.isValid()) {
    if (
      !effectiveDateStart.isSameOrBefore(effectiveDateEnd, 'day') &&
      formValues.repeat === 'none' &&
      formValues.range_type !== 'single'
    ) {
      errors.dateRangeInvalid = "Date range start must come before end";
    }
  } else {
    // Date range is invalid
    errors.dateRangeInvalid = "Date range does not cover valid dates";
  }

  if (
    // Guard against `undefined` values, because if they're passed to Moment
    // the lib will cheerfully assume you passed nothing and just create new
    // Moments to reflect "now". And the validation won't work.
    !!formValues.cust_reservable_start_at &&
    !!formValues.cust_reservable_end_at &&
    !!formValues.effective_time_start_at &&
    !!formValues.effective_time_end_at
  ) {
    const custReservableStartAt = moment(formValues.cust_reservable_start_at);
    const custReservableEndAt = moment(formValues.cust_reservable_end_at);
    const effectiveTimeStartAt = moment(formValues.effective_time_start_at);
    const effectiveTimeEndAt = moment(formValues.effective_time_end_at);

    if (custReservableStartAt.isSameOrAfter(custReservableEndAt, 'minute')) {
      errors.invalidCustomerReservableRange = "Customer reservable start time cannot be after end time";
    }

    if (effectiveTimeStartAt.isSameOrAfter(effectiveTimeEndAt, 'minute')) {
      errors.invalidEffectiveTimeRange = "Effective start time cannot be after end time";
    }

    if (effectiveTimeStartAt.isAfter(custReservableStartAt, 'minute')) {
      errors.invalidEffectiveTimeRange = "Customer reservable start time must be same or after effective start time";
    }

    if (effectiveTimeEndAt.isBefore(custReservableEndAt, 'minute')) {
      errors.invalidEffectiveTimeRange = "Customer reservable end time must be same or after effective end time";
    }
  }

  return errors;
}

export const ReservationPlanForm = ({
  reservationPlan,
  controls,
  floorPlans = [],
  onSubmit = () => undefined,
}) => (
  <div className="rest-settings__aside__body padding--16">
    <Form
      onSubmit={onSubmit}
      initialValues={reservationPlan}
      decorators={[formValuesDecorator]}
      mutators={{
        ...arrayMutators
      }}
      validate={formValidator}
      render={({
        form,
        handleSubmit,
        values,
        pristine,
        invalid,
      }) => (
        <form onSubmit={(event) => handleSubmit(event).then(() => form.reset())}>
          <ScheduleSettingsFormSegment
            formValues={values}
            allFloorPlans={floorPlans}
            formArrayPush={form.mutators.push}
          />
          {controls({isSubmitEnabled: !pristine && !invalid})}
        </form>
      )}
    />
  </div>
);

const QueriedReservationPlanForm = (props) => (
  <LoadingQuery
    query={listFloorPlansGql}
    fetchPolicy="cache-and-network"
  >
    {({data})=>{
      const floorPlans = data.listFloorPlans;

      return (
        <ReservationPlanForm
          {...props}
          floorPlans={floorPlans}
        />
      );
    }}
  </LoadingQuery>
);

export default QueriedReservationPlanForm;
