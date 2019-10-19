import * as moment from 'moment-timezone';
import { reservationDateFormat } from 'shared/reservation/fields/ReservationDateField';

export function formValueFormatter(formValues, timezoneName) {
  const formattedFormValues = {
    name: formValues.name,
    email: formValues.email,
    phone_number: formValues.phone_number,
    party_size: formValues.party_size,
    party_notes: formValues.party_notes,
    reservation_status: formValues.reservation_status,
    floor_plan_table_id: formValues.floor_plan_table_id,
    employee: formValues.employee,
    tags: formValues.tags,
    override_turn_time: parseFloat(formValues.override_turn_time)
  };

  const reservationAtMoment = moment.tz(
    `${formValues.reservationDate} ${formValues.reservationTime}`,
    `${reservationDateFormat} h:mm a`,
    timezoneName
  );

  formattedFormValues.scheduled_start_at = reservationAtMoment.toISOString();

  return formattedFormValues;
}

export default formValueFormatter;
