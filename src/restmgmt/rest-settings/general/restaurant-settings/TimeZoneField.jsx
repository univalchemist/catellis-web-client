import React, { Fragment } from 'react';
import { Field } from 'react-final-form';

import {
  required,
  composeValidators
} from 'shared/form/validators';
import { Label } from 'shared/form/label/Label';
import { FormError } from 'shared/form/FormError';

export const TimeZoneField = ({
  label = `Time Zone`,
  labelRequired
}) => (
  <Field
    name="timezone_name"
    validate={composeValidators(required)}
  >
    {({ input, meta }) => {
      const isError = meta.error && meta.touched;

      return (
        <Fragment>
          <Label required={labelRequired}>{label}</Label>
          <select
            {...input}
            className={isError ? 'input--error' : ''}
          >
            <option value="">Select One</option>
            <option value="America/Chicago">Chicago</option>
            <option value="America/Denver">Denver</option>
            <option value="America/Indianapolis">Indianapolis</option>
            <option value="America/Los_Angeles">Los Angeles</option>
            <option value="America/New_York">New York</option>
            <option value="America/Phoenix">Phoenix</option>
          </select>
          <FormError meta={meta} />
        </Fragment>
      );
    }}
  </Field>
);

export default TimeZoneField;
