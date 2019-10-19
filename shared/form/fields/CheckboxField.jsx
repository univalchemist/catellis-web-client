import React, { Fragment } from 'react';
import { Field } from 'react-final-form';

export const CheckboxField = ({
  fieldName,
  dayName,
  label
}) => {
  return (
    <Field
      name={fieldName}
      type="checkbox"
    >
      {({ input }) => {

        return (
          <Fragment>
            <label>
              {label} &nbsp;
              <input
                {...input}
                type="checkbox"
              />
              {dayName}
            </label>
          </Fragment>
        );
      }}
    </Field>
  );
};

export default CheckboxField;
