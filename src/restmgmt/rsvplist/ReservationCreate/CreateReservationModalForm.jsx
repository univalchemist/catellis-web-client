import * as React from 'react';
import {Fragment as Frag} from 'react';
import {compose, withApollo} from 'react-apollo';
import {Form} from 'react-final-form';
import _ from 'lodash';

import StackedSubmitCancelControls from 'shared/form/StackedSubmitCancelControls';
import Modal from 'shared/modal/modal';
import ReservationFormModalSegment from 'restmgmt/rsvplist/ReservationFormModalSegment';
import {OptionalNameField, OptionalPhoneField} from 'shared/form/fields';
import AutoComplete from 'shared/auto-complete/AutoComplete';
import { toastSuccess, toastError } from 'shared/toast';
import createReservationAnyCustomerMutationWrapper from 'restmgmt/rsvplist/api.createReservationAnyCustomer.mutation';
import { graphQlOp as editReservationGql } from 'restmgmt/rsvplist/api.editReservation.mutation';
import { opName as listReservationsOpName } from 'restmgmt/rsvplist/api.listReservations.query';
import * as moment from "moment-timezone";

class CreateReservationModalForm extends React.Component {
    state = {
        isLoading: false,
        name: '',
        formValues: {
            phone_number: ''
        }
    };

    componentDidMount() {
        console.log('super createReservationModalForm', this.props);
    }

    update = value => {
      this.setState((prevState, props) => {
          const { customers } = props;
          const customer = _.find(customers, (c => { return c.name === value }));
          if (customer) {
              const phone_number = customer["phone_number"];

              return {
                  name: value,
                  formValues: { phone_number }
              }
          }
          return { name: value };
      } );
    };

    onChangeReservationToComplete = async reservation => {
        return await this.props.client.mutate({
            mutation: editReservationGql,
            variables: {
                input: {
                    id: reservation.id,
                    reservation_status: 'complete'
                }
            }
        });
    };
    onSubmitReservationForm = async (formValues) => {
        const { restaurant, floorPlanTable, reservations } = this.props;

        formValues.scheduled_start_at = moment().toISOString();
        formValues.seated_at = moment().toISOString();
        formValues.restaurant_id = restaurant.id;
        formValues.floor_plan_table_id = floorPlanTable.id;
        formValues.email = '';
        formValues.party_notes = '';
        formValues.tags = '';
        formValues.name = this.state.name;
        if (!formValues.name) {
            formValues.name = 'Anonymous';
        }
        if (!formValues.phone_number) {
            formValues.phone_number = '0000000';
        }
        console.log('super formValues', formValues);
        this.setState({ isLoading: true });
        try {
            const promises = reservations.map(r => this.onChangeReservationToComplete(r));
            await Promise.all(promises);

            const {data: {createReservationAnyCustomer: result}} = await this.props.createReservationAnyCustomer({
                variables: formValues
            });
            const { reservation } = result;
            const reservationAtMoment = moment.tz(reservation.scheduled_start_at, restaurant.timezone_name),
                date = reservationAtMoment.format('MMMM D'),
                time = reservationAtMoment.format('h:mm A');
            toastSuccess(`Your reservation for on ${date} at ${time} is booked!`);
            this.props.onClose();
        } catch (e) {
            console.log('super e',e);
            console.log('super e graphQLErrors',e.graphQLErrors);
            if(e.graphQLErrors) {
                toastError(e.graphQLErrors[0].message);
            } else {
                toastError();
            }
        }
        this.setState({ isLoading: false });
    };
    render() {
        const { isLoading, formValues } = this.state;
        const { onClose, customers, floorPlanTable } = this.props;
        console.log('super floorPlanTable', floorPlanTable);
        const suggestions = customers.map(c => c.name);
        return (
            <Modal
                title="Create Reservation"
                onClose={onClose}
                body={({onClose}) => (
                    <Frag>
                        <Form
                            onSubmit={this.onSubmitReservationForm}
                            initialValues={formValues}
                            render={({handleSubmit, pristine, invalid, form}) => (
                                <form
                                    className="rest-page__section__body-form"
                                    onSubmit={(event) => handleSubmit(event).then(() => form.reset())}
                                >
                                    <div>
                                        <AutoComplete
                                            suggestions={suggestions}
                                            update={this.update}
                                        />
                                    </div>
                                    {/*<div>
                                        <OptionalNameField />
                                    </div>*/}
                                    <div>
                                        <OptionalPhoneField/>
                                    </div>
                                    <div>
                                        <ReservationFormModalSegment/>
                                    </div>
                                    <StackedSubmitCancelControls
                                        submitText="Create"
                                        loadingText="Creating"
                                        isSubmitEnabled={!pristine && !invalid}
                                        isLoading={isLoading}
                                        onCancel={onClose}
                                    />
                                </form>
                            )}/>
                    </Frag>
                )}
            />
        );
    }
}

export default withApollo(compose(
    createReservationAnyCustomerMutationWrapper(
        'createReservationAnyCustomer',
        {
            options: {
                refetchQueries: [listReservationsOpName]
            }
        }
    ),
)(CreateReservationModalForm));
