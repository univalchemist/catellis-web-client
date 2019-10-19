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

const annualRepeatDateFormat = 'MMMM D';
const isAnnualRepeatBehavior = {
  parse: value => {
    const normalizedMoment = moment.tz(value, annualRepeatDateFormat, 'UTC');
    normalizedMoment.year(2000).startOf('day');
    return normalizedMoment.toISOString();
  },
  format: value => {
    return moment.tz(value, 'UTC').format(annualRepeatDateFormat)
  },
  dateSelectorInputFormat: annualRepeatDateFormat,
};

const noRepeatDateFormat = 'MMMM D, YYYY';
const isNoRepeatBehavior = {
  parse: value => {
    const normalizedMoment = moment.tz(value, noRepeatDateFormat, 'UTC');
    normalizedMoment.startOf('day');
    return normalizedMoment.toISOString();
  },
  format: value => {
    return moment.tz(value, 'UTC').format(noRepeatDateFormat)
  },
  dateSelectorInputFormat: noRepeatDateFormat,
};

export const DatePickerField = ({
  label = `Reservation Date`,
  fieldName = 'reservationDate',
  labelRequired,
  isAnnualRepeat = false,
}) => {
  let repeatBehavior = isAnnualRepeat
    ? isAnnualRepeatBehavior
    : isNoRepeatBehavior;

  return (
    <Field
      name={fieldName}
      parse={repeatBehavior.parse}
      format={repeatBehavior.format}
      validate={composeValidators(required)}
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Fragment>
            <Label required={labelRequired}>{label}</Label>
            <DateSelectorInput
              input={input}
              dateFormat={repeatBehavior.dateSelectorInputFormat}
              className={isError ? 'input--error' : ''}
            />
            <FormError meta={meta} />
          </Fragment>
        );
      }}
    </Field>
  );
};

export default DatePickerField;
