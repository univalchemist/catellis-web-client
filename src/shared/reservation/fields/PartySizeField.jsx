import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';

import {
  required,
  composeValidators,
  onlyDigits
} from 'shared/form/validators';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const PartySizeField = ({
  label = `Guest Count`,
  maxGuests,
  minGuests,
  labelRequired
}) => {
  const guestCounts = Array.from(Array(maxGuests + 1).keys()).slice(minGuests);

  return (
    <Field
      name="party_size"
      parse={value => parseInt(value, 10)}
      validate={composeValidators(required, onlyDigits)}
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Frag>
            <Label required={labelRequired}>{label}</Label>
            <select
              {...input}
              className={isError ? 'input--error' : ''}
            >
              <option>Select One</option>
              {guestCounts.map(x => (
                <option value={x} key={x}>{x}</option>
              ))}
            </select>
            <FormError meta={meta} />
          </Frag>
        );
      }}
    </Field>
  );
};

export default PartySizeField;
