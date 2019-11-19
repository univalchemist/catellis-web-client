import React, {Fragment as Frag} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'react-apollo';
import {Form, Field, FormSpy} from 'react-final-form';
import _pick from 'lodash.pick';
import uuidv4 from 'uuidv4';

import AsideHeaderBackHistory from 'restmgmt/shared/AsideHeaderBackHistory';
import {Card} from 'shared/card';
import DraggableTableIcon from './DraggableTableIcon';
import {
    required,
    composeValidators,
    minLength
} from 'shared/form/validators';
import {FadeInAnimation} from 'shared/animations';
import {FormError} from 'shared/form/FormError';
import {Label} from 'shared/form/label/Label';
import StackedSubmitCancelControls from 'shared/form/StackedSubmitCancelControls';
import createFloorPlanWrapper from 'restmgmt/rest-settings/floor-plans/api.createFloorPlan.mutation';
import editFloorPlanWrapper from 'restmgmt/rest-settings/floor-plans/api.editFloorPlan.mutation';
import {listFloorPlansOpName} from 'shared/gql/floor-plans';
import updateFloorPlanWrapper from 'restmgmt/store/operations/local.updateFloorPlan.mutation';

const TableToolbox = () => (
    <div className="rest-floor-create__aside__icon-container">
        <DraggableTableIcon
            isStamp={true}
            id="new"
            table_shape="rectangle"
            table_size={2}
            min_covers={1}
            max_covers={2}
        />
        <DraggableTableIcon
            isStamp={true}
            id="new"
            table_shape="rectangle"
            table_size={4}
            min_covers={2}
            max_covers={4}
        />
        <DraggableTableIcon
            isStamp={true}
            id="new"
            table_shape="rectangle"
            table_size={6}
            min_covers={3}
            max_covers={6}
        />
        <DraggableTableIcon
            isStamp={true}
            id="new"
            table_shape="rectangle"
            table_size={8}
            min_covers={4}
            max_covers={8}
        />
        <DraggableTableIcon
            isStamp={true}
            id="new"
            table_shape="circle"
            table_size={2}
            min_covers={1}
            max_covers={2}
        />
        <DraggableTableIcon
            isStamp={true}
            id="new"
            table_shape="circle"
            table_size={4}
            min_covers={2}
            max_covers={4}
        />
        <DraggableTableIcon
            isStamp={true}
            id="new"
            table_shape="circle"
            table_size={6}
            min_covers={3}
            max_covers={6}
        />
        <DraggableTableIcon
            isStamp={true}
            id="new"
            table_shape="bar"
            table_size={1}
            min_covers={1}
            max_covers={1}
        />
    </div>
);

const TABLE_PROPS = [
    'id',
    'x',
    'y',
    'table_reservation_status',
    'table_number',
    'table_size',
    'table_shape',
    'table_type',
    'table_rotation',
    'min_covers',
    'max_covers',
    '_destroy'
];

class FloorPlanFormSpy extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.active && this.props.active !== nextProps.active) {
            // blur occurred
            this.save(this.props.active)
        }
    }

    save = async (blurredField) => {
        await this.props.onUpdate(this.props.values);
    }

    render() {
        return null;
    }
}

export class FloorPlanAside extends React.Component {
    onSubmit = (formValues) => {
        const preppedTables = formValues.floor_plan_tables
            .map(table => _pick(table, TABLE_PROPS))
            .map(table => {
                if (uuidv4.is(table.id)) {
                    delete table.id;
                }

                return table;
            })

        let opQ;
        if (formValues.id === 'new') {
            // Create new floor plan
            opQ = this.props.onRequestApiCreate({
                id: formValues.id,
                name: formValues.name,
                floor_plan_tables_attributes: preppedTables
            });
        } else {
            // Edit existing floor plan
            opQ = this.props.onRequestApiUpdate({
                name: formValues.name,
                floor_plan_tables_attributes: preppedTables
            });
        }

        return opQ;
    };

    render() {
        const {
            history,
            floorPlan
        } = this.props;
        const onCancel = () => history.push('/rm/restaurant_settings');
        console.log('super ===>', floorPlan)
        // Validate floor table names.
        const collatedTableNames = floorPlan.floor_plan_tables
            .reduce((collated, table) => {
                collated[table.table_number] = (collated[table.table_number] || 0) + 1;

                return collated;
            }, {});
        const isFloorPlanTableNamesValid = Object.keys(collatedTableNames)
            .filter(key => collatedTableNames[key] > 1)
            .length === 0;

        return (
            <div className="rest-page__aside rest-floor-create__aside">
                <Card size="md" cardOverflow={true}>
                    <AsideHeaderBackHistory
                        ariaLabel='back-to-restaurant-settings'
                        onClickBack={onCancel}
                    />
                    <FadeInAnimation>
                        <div className="rest-page__aside__body card__overflow-container">
                            <Form
                                onSubmit={this.onSubmit}
                                initialValues={floorPlan}
                                render={({handleSubmit, pristine, invalid}) => (
                                    <div className="rest-page__section__body-form">
                                        <FormSpy
                                            onUpdate={(values) => {
                                                this.props.onRequestLocalUpdate({name: values.name})
                                            }
                                            }
                                            subscription={{active: true, values: true}}
                                            component={FloorPlanFormSpy}
                                        />
                                        <h5 className="margin-bottom--8">General Information</h5>
                                        <p className="text--gray-dark">
                                            Basic information about the room and its layout. Before you can save, each
                                            table must have a unique table number.
                                        </p>
                                        <div className="margin-bottom--32">
                                            <Field
                                                name="name"
                                                validate={composeValidators(required, minLength(3))}
                                            >
                                                {({input, meta}) => {
                                                    const isError = meta.error && meta.touched;

                                                    return (
                                                        <Frag>
                                                            <Label>Room Title</Label>
                                                            <input
                                                                {...input}
                                                                type="text"
                                                                placeholder="Dining Room"
                                                                className={isError ? 'input--error' : ''}
                                                                required="true"
                                                            />
                                                            <FormError meta={meta}/>
                                                        </Frag>
                                                    );
                                                }}
                                            </Field>
                                            <StackedSubmitCancelControls
                                                submitText="Save Changes"
                                                loadingText="Saving"
                                                isSubmitEnabled={!invalid && isFloorPlanTableNamesValid}
                                                isLoading={false}
                                                onCancel={onCancel}
                                                onSubmit={handleSubmit}
                                            />
                                        </div>

                                        <h5 className="margin-bottom--8">Add Tables</h5>
                                        <p className="text--gray-dark">
                                            Drag a new table on to your floor layout or click on an existing table to
                                            update its information.
                                        </p>
                                        <TableToolbox/>
                                    </div>
                                )}/>
                        </div>
                    </FadeInAnimation>
                </Card>
            </div>
        );
    }
}

export default compose(
    withRouter,
    updateFloorPlanWrapper(
        'editFloorPlan',
        {
            props: ({editFloorPlan, ownProps: {floorPlan}}) => ({
                onRequestLocalUpdate: (floorPlanValues) => {
                    const opQ = editFloorPlan({
                        variables: {
                            input: {
                                ...floorPlanValues,
                                id: floorPlan.id
                            }
                        }
                    });

                    return opQ;
                }
            })
        }
    ),
    editFloorPlanWrapper(
        'editFloorPlan',
        {
            props: ({editFloorPlan, ownProps: {floorPlan}}) => ({
                onRequestApiUpdate: (floorPlanValues) => {
                    const opQ = editFloorPlan({
                        variables: {
                            input: {
                                ...floorPlanValues,
                                id: floorPlan.id
                            }
                        }
                    });

                    return opQ;
                }
            })
        }
    ),
    createFloorPlanWrapper(
        'createFloorPlan',
        {
            props: ({createFloorPlan, ownProps: {floorPlan, history}}) => ({
                onRequestApiCreate: (floorPlanValues) => {
                    const opQ = createFloorPlan({
                        variables: {
                            input: {
                                ...floorPlanValues,
                            }
                        }
                    });

                    opQ
                        .then((response) => {
                            history.push(
                                `/rm/restaurant_settings/floor_plans/${response.data.createFloorPlan.id}`
                            );
                        })

                    return opQ;
                }
            }),
            options: {
                refetchQueries: [listFloorPlansOpName]
            }
        }
    ),
)(FloorPlanAside);
