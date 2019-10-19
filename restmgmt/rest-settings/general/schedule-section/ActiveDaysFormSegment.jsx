import React from 'react';

import {
  GridCol,
  GridRow
} from 'shared/layout/grid';
import { CheckboxField } from 'shared/form/fields';
import { Label } from 'shared/form/label/Label';

const ActiveDaysFormSegment = () => (
  <div className="margin-bottom--16">
    <Label>Active Days</Label>
    <GridRow>
      <GridCol l={6} m={5} s={2}>
        <CheckboxField
          fieldName="active_weekday_0"
          dayName="Sunday"
        />
      </GridCol>
      <GridCol l={6} m={4} s={2}>
        <CheckboxField
          fieldName="active_weekday_1"
          dayName="Monday"
        />
      </GridCol>
    </GridRow>
    <GridRow>
      <GridCol l={6} m={5} s={2}>
        <CheckboxField
          fieldName="active_weekday_2"
          dayName="Tuesday"
        />
      </GridCol>
      <GridCol l={6} m={4} s={2}>
        <CheckboxField
          fieldName="active_weekday_3"
          dayName="Wednesday"
        />
      </GridCol>
    </GridRow>
    <GridRow>
      <GridCol l={6} m={5} s={2}>
        <CheckboxField
          fieldName="active_weekday_4"
          dayName="Thursday"
        />
      </GridCol>
      <GridCol l={6} m={4} s={2}>
        <CheckboxField
          fieldName="active_weekday_5"
          dayName="Friday"
        />
      </GridCol>
    </GridRow>
    <GridRow>
      <GridCol l={6} m={5} s={2}>
        <CheckboxField
          fieldName="active_weekday_6"
          dayName="Saturday"
        />
      </GridCol>
    </GridRow>
  </div>
);

export default ActiveDaysFormSegment;
