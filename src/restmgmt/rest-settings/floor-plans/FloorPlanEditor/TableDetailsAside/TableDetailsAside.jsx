import React, { Fragment as Frag } from 'react';
import { compose } from 'react-apollo';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';

import CoversField from './CoversField';
import TableTypeField from './TableTypeField';
import TableRemoveButton from './TableRemoveButton';
import TableRotateButton from './TableRotateButton';
import AsideHeaderBack from 'restmgmt/shared/AsideHeaderBack';
import { Card } from 'shared/card';
import { GridRow, GridCol } from 'shared/layout/grid';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import {
  required,
  composeValidators
} from 'shared/form/validators';
import { FadeUpAnimation } from 'shared/animations';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';
import StackedSubmitCancelControls from 'shared/form/StackedSubmitCancelControls';
import getFloorPlanTableWrapper from 'restmgmt/store/operations/local.getFloorPlanTable.query';
import setFloorPlanSelectedTableWrapper from 'restmgmt/store/operations/local.setFloorPlanSelectedTable.mutation';
import setFloorPlanTableAttrsWrapper from 'restmgmt/store/operations/local.setFloorPlanTableAttrs.mutation';

const coversAdjuster = createDecorator(
  {
    field: 'min_covers',
    updates: {
      max_covers: (minCoversValue, allValues) =>
        Math.max(minCoversValue || 0, allValues.max_covers || 0)
    }
  },
  {
    field: 'max_covers',
    updates: {
      min_covers: (maxCoversValue, allValues) =>
        Math.min(maxCoversValue || 0, allValues.min_covers || 0)
    }
  },
)

export const TableDetailsAside = ({
  loading,
  floorPlanTable,
  onCancel,
  onRemove,
  onUpdate
}) => {
  if (loading) {
    return (<LoadingIndicator />);
  }

  return (
    <div className="rest-page__aside rest-floor-create__aside">
      <Card size="md">
        <AsideHeaderBack
          ariaLabel='back-to-restaurant-settings'
          onClickBack={onCancel}
        />
        <FadeUpAnimation>
          <div className="rest-page__aside__body card__overflow-container">
            <header aria-label="table-information-form">
              <h5 className="margin-bottom--8">Table Information</h5>
              <p className="text--gray-dark">Please note, the table number must be unique and not present on this floor layout already.</p>
            </header>
            <ul className="button-group">
              <li className="button-group__item button-group__item--3">
                <TableRotateButton
                  floorPlanTable={floorPlanTable}
                  direction="counterclockwise"
                />
              </li>
              <li className="button-group__item button-group__item--3">
                <TableRotateButton
                  floorPlanTable={floorPlanTable}
                  direction="clockwise"
                />
              </li>
              <li className="button-group__item button-group__item--3">
                <TableRemoveButton id={floorPlanTable.id} />
              </li>
            </ul>
            <Form
              onSubmit={onUpdate}
              initialValues={floorPlanTable}
              decorators={[coversAdjuster]}
              render={({handleSubmit, pristine, invalid, form}) => (
                <form
                  className="rest-page__section__body-form"
                  onSubmit={(event) => handleSubmit(event).then(() => form.reset())}
                >
                  <div>
                    <Field
                      name="table_number"
                      validate={composeValidators(required)}
                    >
                      {({ input, meta }) => {
                        const isError = meta.error && meta.touched;

                        if (input.value === '?') {
                          delete input.value;
                        }

                        return (
                          <Frag>
                              <Field
                                  name="table_reservation_status"
                                  validate={composeValidators(required)}
                              >
                                  {({input, meta}) => {
                                      const isError = meta.error && meta.touched;

                                      return (
                                          <Frag>
                                              <Label
                                                  required={false}>{'Table Reservation Status'}</Label>
                                              <select
                                                  {...input}
                                                  className={isError ? 'input--error' : ''}
                                              >
                                                  <option>Select Reservation Status</option>
                                                  <option value={'online_in_store'}>Online & In-store</option>
                                                  <option value={'in_store'}>In-store Only</option>
                                                  <option value={'blocked'}>Blocked</option>
                                              </select>
                                              <FormError meta={meta}/>
                                          </Frag>
                                      );
                                  }}
                              </Field>
                            <Label>Table Number</Label>
                            <input
                              {...input}
                              type="text"
                              placeholder="Please enter a table number"
                              className={isError ? 'input--error' : ''}
                              required="true"
                            />
                            <FormError meta={meta} />
                          </Frag>
                        );
                      }}
                    </Field>
                  </div>
                  <div>
                    <TableTypeField />
                  </div>
                  <GridRow>
                    <GridCol m={4} l={6}>
                      <CoversField
                        fieldName="min_covers"
                        label="Min Covers"
                        table_size={floorPlanTable.table_size}
                      />
                    </GridCol>
                    <GridCol m={5} l={6}>
                      <CoversField
                        fieldName="max_covers"
                        label="Max Covers"
                        table_size={floorPlanTable.table_size}
                      />
                    </GridCol>
                  </GridRow>
                  <StackedSubmitCancelControls
                    submitText="Save Changes"
                    loadingText="Saving"
                    isSubmitEnabled={!pristine && !invalid}
                    isLoading={false}
                    onCancel={onCancel}
                  />
                </form>
              )}
            />
          </div>
        </FadeUpAnimation>
      </Card>
    </div>
  );
};

export default compose(
  getFloorPlanTableWrapper(
    'getFloorPlanTable',
    {
      options: (props) => ({
        variables: {
          id: props.id
        }
      }),
      props: ({getFloorPlanTable: {loading, getFloorPlanTable: floorPlanTable}}) => {
        return {
          loading,
          floorPlanTable
        };
      }
    }
  ),
	setFloorPlanSelectedTableWrapper(
		'setFloorPlanSelectedTable',
		{
			props: ({setFloorPlanSelectedTable}) => ({
				onCancel: () => {
					const opQ = setFloorPlanSelectedTable({
						variables: {
							id: null
						}
					});

					return opQ;
				}
			}),
		}
	),
	setFloorPlanTableAttrsWrapper(
		'setFloorPlanTableAttrs',
		{
			props: ({setFloorPlanTableAttrs, ownProps}) => ({
				onUpdate: (attrs) => {
					const opQ = setFloorPlanTableAttrs({
						variables: {
							id: attrs.id,
							x: attrs.x,
							y: attrs.y,
                            table_reservation_status: attrs.table_reservation_status,
							table_number: attrs.table_number,
							table_type: attrs.table_type,
							min_covers: attrs.min_covers,
							max_covers: attrs.max_covers,
						}
					});

					return opQ;
				}
			}),
		}
	),
)(TableDetailsAside);
