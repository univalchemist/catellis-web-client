import * as React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment-timezone';

import ReservationsListSidebarFooter from 'restmgmt/rsvplist/ReservationsListSidebarFooter';
import getCurrentRestaurantQueryWrapper from 'restmgmt/rest-settings/api.getCurrentRestaurant.query';
import listCustomersQueryWrapper from 'restmgmt/customers/api.listCustomers.query';
import createReservationFuzzyCustomerMutationWrapper from 'restmgmt/rsvplist/api.createReservationFuzzyCustomer.mutation';
import createReservationMutationWrapper from 'restmgmt/rsvplist/api.createReservation.mutation';
import createCustomerMutationWrapper from 'restmgmt/customers/api.createCustomer.mutation.js';
import { toastSuccess, toastError } from 'shared/toast';
import ReservationForm from './ReservationForm';
import CustomerConfirmation from './CustomerConfirmation';
import { opName as listReservationsOpName } from 'restmgmt/rsvplist/api.listReservations.query';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';

export class ReservationCreate extends React.Component {
  state = {
    step: 1,
    reservationValues: {
      name: null,
      phone_number: null,
      scheduled_start_at: moment().toISOString(),
      party_size: null,
      reservation_status: 'not_confirmed',
      party_notes: null,
      employee: null,
      tags: null
    }
  };

  onCreateReservationSuccess(reservationId) {
    toastSuccess(`Got it! Reservation has been created.`);

    this.props.history.push(`/rm/rsvp_list/seated`);
  }

  onSubmitReservationForm = async (formValues) => {
    try {
      const {data: {createReservationFuzzyCustomer: fuzzyCreateResult}} = await this.props.createReservationFuzzyCustomer({
        variables: formValues
      });

      if (fuzzyCreateResult.status === 'reservation_created') {
        // Exact match, reservation has been created.
        this.onCreateReservationSuccess(fuzzyCreateResult.reservation.id);
      } else if (fuzzyCreateResult.status === 'no_exact_match') {
        // No exact match (or no match at all), push to step two.
        this.setState({
          step: 2,
          reservationValues: formValues,
          suggestedCustomers: fuzzyCreateResult.suggested_customers
        });
      }
    } catch (error) {
      toastError();
    }
  }

  onSubmitExistingCustomer = async (customerId) => {
    try {
      const {data: {createReservation: createResult}} = await this.props.createReservation({
        variables: {
          ...this.state.reservationValues,
          customer_id: customerId
        }
      });

      // Exact match, reservation has been created.
      this.onCreateReservationSuccess(createResult.id);
    } catch (error) {
      toastError();
    }
  }

  onSubmitNewCustomer = async (email) => {
    try {
      const {data: {createCustomer: createCustomerResult}} = await this.props.createCustomer({
        variables: {
          name: this.state.reservationValues.name,
          phone_number: this.state.reservationValues.phone_number,
          email: email
        }
      });

      await this.onSubmitExistingCustomer(createCustomerResult.id);
    } catch (e) {
      toastError();
    }
  }

  render() {
    const {
      customers,
      history,
      onRequestUpdate,
      restaurant: {loading: isRestaurantLoading, getCurrentRestaurant: restaurant}
    } = this.props;

    if (isRestaurantLoading) {
      return (
        <LoadingIndicator />
      );
    }

    const { step } = this.state;
    let currentStepView;
    switch (step) {
      case 1:
        currentStepView = (
          <ReservationForm
            reservationValues={this.state.reservationValues}
            customers={customers}
            onUpdate={onRequestUpdate}
            history={history}
            onSubmit={(formValues) => this.onSubmitReservationForm(formValues)}
            onCancel={() => history.goBack()}
            restaurant={restaurant}
          />
        );
        break;

      case 2:
        currentStepView = (
          <CustomerConfirmation
            suggestedCustomers={this.state.suggestedCustomers}
            reservationValues={this.state.reservationValues}
            onSubmitExistingCustomer={(customerId) => this.onSubmitExistingCustomer(customerId)}
            onSubmitNewCustomer={(email) => this.onSubmitNewCustomer(email)}
            onCancel={() => this.setState({step: 1})}
          />
        );
        break;

      default:
        throw new Error('Unrecognized step');
    }

    return (
      <React.Fragment>
        {currentStepView}
        <ReservationsListSidebarFooter />
      </React.Fragment>
    );
  }
}

export default compose(
  withRouter,
  getCurrentRestaurantQueryWrapper(
    'restaurant'
  ),
  listCustomersQueryWrapper(
    'customers'
  ),
  createReservationFuzzyCustomerMutationWrapper(
    'createReservationFuzzyCustomer',
    {
      options: {
        refetchQueries: [listReservationsOpName]
      }
    }
  ),
  createReservationMutationWrapper(
    'createReservation',
    {
      options: {
        refetchQueries: [listReservationsOpName]
      }
    }
  ),
  createCustomerMutationWrapper(
    'createCustomer'
  ),
)(ReservationCreate);
