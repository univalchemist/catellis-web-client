import React, { Fragment } from 'react';
import { Field } from 'react-final-form';
import * as moment from 'moment-timezone';

import { DateSelectorInput } from 'shared/form/inputs';
import {
  required,
  composeValidators,
} from 'shared/form/validators';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const reservationDateFormat = 'dddd, MMMM D, YYYY';

const yesterdayMoment = moment().subtract(1, 'days');
const isNotPastDate = (currentDate) => {
  return currentDate.isAfter(yesterdayMoment);
}

export const ReservationDateField = (props, {
  label = `Reservation Date`,
  fieldName = 'reservationDate',
  labelRequired,
  isValidDate = isNotPastDate,
  onChange = props.onChange
}) => {
  return (
    <Field
      name={fieldName}
      parse={value => value.format(reservationDateFormat)}
      validate={composeValidators(required)}
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Fragment>
            <Label required={labelRequired}>{label}</Label>
            <DateSelectorInput
              input={input}
              className={isError ? 'input--error' : ''}
              isValidDate={isValidDate}
              onChange={onChange ? onChange(input) : null}
            />
            <FormError meta={meta} />
          </Fragment>
        );
      }}
    </Field>
  );
};

export default ReservationDateField;
