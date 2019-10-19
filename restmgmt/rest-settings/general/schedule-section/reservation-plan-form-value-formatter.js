import _pick from 'lodash.pick';
import * as moment from 'moment-timezone';

const reservationPlanUpdateProps = [
  'id',
  'name',
  'repeat',
  'priority',
  'effective_time_start_at',
  'effective_time_end_at',
  'cust_reservable_start_at',
  'cust_reservable_end_at',
  'effective_date_start_at',
  'effective_date_end_at',
  'active_weekday_0',
  'active_weekday_1',
  'active_weekday_2',
  'active_weekday_3',
  'active_weekday_4',
  'active_weekday_5',
  'active_weekday_6',
];

const dateFormat = 'YYYY-MM-DD';

export function formValueFormatter(formValues, originalReservationPlan) {
  // Pick only what can be transferred.
  const formattedFormValues = _pick(formValues, reservationPlanUpdateProps);

  formattedFormValues.priority = parseInt(formattedFormValues.priority, 10);

  // Force the dates to be pure date values, in UTC time zone (with no hours or TZ offset).
  formattedFormValues.effective_date_start_at = moment.tz(
    moment.tz(formValues.effective_date_start_at, 'UTC').format(dateFormat),
    dateFormat,
    'UTC'
  );
  formattedFormValues.effective_date_end_at = moment.tz(
    moment.tz(formValues.effective_date_end_at, 'UTC').format(dateFormat),
    dateFormat,
    'UTC'
  );

  if (formValues.repeat === 'annually') {
    formattedFormValues.effective_date_start_at.year(2000);
    formattedFormValues.effective_date_end_at.year(2000);
  }

  if (
    formattedFormValues.effective_date_start_at.isAfter(
      formattedFormValues.effective_date_end_at
    )
  ) {
    formattedFormValues.effective_date_end_at = formattedFormValues.effective_date_start_at;
  }

  formattedFormValues.reservation_plan_floor_plans_attributes = [];

  // Add destroyed associations
  originalReservationPlan.reservation_plan_floor_plans
    .filter(originalJoin => {
      return !formValues.reservation_plan_floor_plans.some(formJoin => formJoin.id === originalJoin.id);
    })
    .forEach(destroyedJoin => {
      formattedFormValues.reservation_plan_floor_plans_attributes.push({
        id: destroyedJoin.id,
        _destroy: true,
      });
    })

  // Add created associations
  formValues.reservation_plan_floor_plans
  .filter(formJoin => {
    return !originalReservationPlan.reservation_plan_floor_plans.some(originalJoin => formJoin.id === originalJoin.id);
  })
  .forEach(newJoin => {
    formattedFormValues.reservation_plan_floor_plans_attributes.push({
      floor_plan_id: newJoin.floor_plan_id,
    });
  })

  return formattedFormValues;
}

export default formValueFormatter;
