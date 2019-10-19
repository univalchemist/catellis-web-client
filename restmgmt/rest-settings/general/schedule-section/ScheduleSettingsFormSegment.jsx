import React, { Fragment } from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import uuidv4 from 'uuidv4';

import { Card } from 'shared/card';
import {
  GridCol,
  GridRow
} from 'shared/layout/grid';
import { NameField } from 'shared/form/fields';
import DatePickerField from './DatePickerField';
import TimeOfDayField from 'restmgmt/rest-settings/general/restaurant-settings/TimeOfDayField.jsx';
import AssociatedFloorPlanItem from './AssociatedFloorPlanItem';
import ActiveDaysFormSegment from './ActiveDaysFormSegment';
import {
  required,
  composeValidators
} from 'shared/form/validators';

const ScheduleSettingsFormSegment = ({
  formValues,
  allFloorPlans = [],
  formArrayPush,
}) => {
  const isAnnualRepeat = formValues['repeat'] === 'annually';

  const associatedFloorPlans = formValues.reservation_plan_floor_plans.map(join => join.floor_plan);
  const availableFloorPlans = allFloorPlans
    .filter(candidateFloorPlan => {
      return !associatedFloorPlans.some(associatedFloorPlan => associatedFloorPlan.id === candidateFloorPlan.id);
    });

  const isSingleDay = formValues.range_type === 'single';

  return (
    <Fragment>
      <NameField
        label="Title"
        placeholder="Special Event"
      />
      <GridRow>
        <GridCol l={6}>
          <label>Type</label>
          <Field
            name="range_type"
            component="select"
            validate={composeValidators(required)}
          >
            <option value="">Select One</option>
            <option value="single">Single-Day</option>
            <option value="range">Date Range</option>
          </Field>
        </GridCol>
        <GridCol l={6}>
          <label>Repetition</label>
          <Field
            name="repeat"
            component="select"
            validate={composeValidators(required)}
          >
            <option value="">Select One</option>
            <option value="none">No Repeat</option>
            <option value="annually">Repeat Annually</option>
          </Field>
        </GridCol>
      </GridRow>
      <GridRow>
        <label>Priority</label>
        <Field
          name="priority"
          component="select"
          validate={composeValidators(required)}
        >
          <option value="">Select One</option>
          <option value="100">Normal</option>
          <option value="200">Override</option>
        </Field>
      </GridRow>
      <GridRow>
        <GridCol>
          <DatePickerField
            isAnnualRepeat={isAnnualRepeat}
            label="Start Date"
            fieldName="effective_date_start_at"
          />
        </GridCol>
      </GridRow>
      {!isSingleDay && (
        <GridRow>
          <GridCol>
            <DatePickerField
              isAnnualRepeat={isAnnualRepeat}
              label="End Date"
              fieldName="effective_date_end_at"
            />
          </GridCol>
        </GridRow>
      )}
      <GridRow>
        <GridCol l={6}>
          <TimeOfDayField
            label="First Reservation"
            fieldName="cust_reservable_start_at"
          />
        </GridCol>
        <GridCol l={6}>
          <TimeOfDayField
            label="Last Reservation"
            fieldName="cust_reservable_end_at"
          />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol l={6}>
          <TimeOfDayField
            label="Start Visibility"
            fieldName="effective_time_start_at"
          />
        </GridCol>
        <GridCol l={6}>
          <TimeOfDayField
            label="End Visibility"
            fieldName="effective_time_end_at"
          />
        </GridCol>
      </GridRow>
      {!isSingleDay && (
        <ActiveDaysFormSegment />
      )}
      <GridRow>
        <label>Active Floor Plans</label>
        <select
          onChange={(event) => {
            const selectedFloorPlanId = event.target.value;

            if (selectedFloorPlanId.trim() === '') return;

            const floorPlan = allFloorPlans.find(candidateFloorPlan => candidateFloorPlan.id === selectedFloorPlanId)

            formArrayPush('reservation_plan_floor_plans', {
              id: uuidv4(),
              floor_plan_id: floorPlan.id,
              floor_plan: {...floorPlan},
            });
          }}
        >
          <option value="">Select One</option>
          {availableFloorPlans.map(floorPlan => (
            <option
              value={floorPlan.id}
              key={floorPlan.id}
            >
              {floorPlan.name}
            </option>
          ))}
        </select>
      </GridRow>
      <Card size="md">
        <table className="table table--condensed">
          <tbody className="table__body">
            <FieldArray name="reservation_plan_floor_plans">
              {({fields}) => {
                if (fields.length === 0) {
                  return (
                    <tr>
                      <td className="table--blank__text">No floor plans added</td>
                    </tr>
                  )
                }

                return fields.map((name, index) => {
                  const joinRecord = formValues.reservation_plan_floor_plans[index];

                  if (joinRecord == null) return null;

                  return (
                    <AssociatedFloorPlanItem
                      floorPlan={joinRecord.floor_plan}
                      key={joinRecord.id}
                      onDestroy={() => {
                        fields.remove(index);
                      }}
                    />
                  );
                });
              }}
            </FieldArray>
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
};

export default ScheduleSettingsFormSegment;
