import React, { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';

import {
  required,
  composeValidators
} from 'shared/form/validators';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

const TABLE_TYPES = [
  {
    key: 'indoor',
    name: 'Indoor'
  },
  {
    key: 'communal',
    name: 'Communal'
  },
  {
    key: 'bar',
    name: 'Bar'
  },
  {
    key: 'outdoor',
    name: 'Outdoor'
  },
  {
    key: 'outdoor_bar',
    name: 'Outdoor Bar'
  },
  {
    key: 'hightop',
    name: 'Hightop'
  },
  {
    key: 'counter',
    name: 'Counter'
  },
  {
    key: 'chefs_table',
    name: `Chef's Table`
  },
];

const TableTypeField = () => {
  return (
    <Field
      name="table_type"
      validate={composeValidators(required)}
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;
        return (
          <Frag>
            <Label>Table Type</Label>
            <select
              {...input}
              className={isError ? 'input--error' : ''}
            >
              <option>Select One</option>
              {TABLE_TYPES.map(tableType => (
                <option
                  value={tableType.key}
                  key={tableType.key}
                >
                  {tableType.name}
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

export default TableTypeField;
