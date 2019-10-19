import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';

import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const TableSelectField = ({
  label = `Select Table`,
  labelRequired,
  tables = []
}) => {

  return (
    <Field
      name="floor_plan_table_id"
      parse={value => {
        return value && value.trim().length >= 1 ? value : null
      }}
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
              <option value="">Select One</option>
              {tables.map(table => (
                <option
                  value={table.id}
                  key={table.id}
                >
                  {table.table_number}
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

export default TableSelectField;
