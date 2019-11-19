import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';

import {
  optional,
  minLength,
  composeValidators
} from 'shared/form/validators';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const OptionalNameField = ({
  label = `Customer's Name`,
  placeholder = `Customer's Name`,
  labelRequired
}) => {

  return (
    <Field
      name="name"
      validate={composeValidators(optional(minLength(3)))}
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Frag>
            <Label required={labelRequired}>{label}</Label>
            <input
              {...input}
              type="text"
              placeholder={placeholder}
              className={isError ? 'input--error' : ''}
            />
            <FormError meta={meta} />
          </Frag>
        );
      }}
    </Field>
  );
};

export default OptionalNameField;
