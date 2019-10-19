import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';

import {
  simpleEmail,
  optional,
  composeValidators
} from 'shared/form/validators';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const EmailField = ({
  label = `Customer's Email`,
  labelRequired
}) => {
  return (
    <Field
      name="email"
      validate={composeValidators(optional(simpleEmail))}
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Frag>
            <Label required={labelRequired}>{label}</Label>
            <input
              {...input}
              type="email"
              placeholder="user@email.com"
              className={isError ? 'input--error' : ''}
            />
            <FormError meta={meta} />
          </Frag>
        );
      }}
    </Field>
  );
};

export default EmailField;
