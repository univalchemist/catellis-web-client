import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const TagsField = ({
  label = `tags`,
  placeholder = `Add Tags`,
  labelRequired
}) => {

  return (
    <Field
      name="tags"
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

export default TagsField;
