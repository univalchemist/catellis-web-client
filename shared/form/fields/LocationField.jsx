import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const LocationField = ({
  label = `Restaurant's Location`,
  labelRequired
}) => {
  return (
    <Field
      name="location"
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Frag>
            <Label required={labelRequired}>{label}</Label>
            <input
              {...input}
              type="location"
              placeholder="Enter Restaurant's address"
              className={isError ? 'input--error' : ''}
            />
            <FormError meta={meta} />
          </Frag>
        );
      }}
    </Field>
  );
};

export default LocationField;
