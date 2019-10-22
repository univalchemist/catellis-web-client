import React, { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';

import {
  required,
  composeValidators
} from 'shared/form/validators';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

const CoversField = ({fieldName, label, table_size}) => {
  const coverOptions = Array.from(Array(table_size + 1).keys()).slice(1);

  return (
    <Field
      name={fieldName}
      parse={value => parseInt(value, 10)}
      validate={composeValidators(required)}
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Frag>
            <Label>{label}</Label>
            <select
              {...input}
              className={isError ? 'input--error' : ''}
            >
              <option>Select One</option>
              {coverOptions.map(option => (
                <option
                  value={option}
                  key={option}
                >
                  {option}
                </option>
              ))}
            </select>
            <FormError meta={meta} />
          </Frag>
        );
      }}
    </Field>
  );
};

export default CoversField;
