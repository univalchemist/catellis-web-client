import React, { Component } from 'react';
import { Form } from 'react-final-form';
import { Mutation, Query } from 'react-apollo';
import * as moment from 'moment-timezone';

import { GridCol, GridRow } from 'shared/layout/grid';
import StackedSubmitCancelControls from 'shared/form/StackedSubmitCancelControls';
import { FadeInAnimation } from 'shared/animations';
import formValueFormatter from 'restmgmt/rsvplist/reservation-form-value-formatter';
import { EmailField, NameField, PhoneField } from 'shared/form/fields';
import {
  PartySizeField,
  PartyNotesField,
  ReservationDateField,
  ReservationTimeField,
} from 'shared/reservation/fields';
import { reservationDateFormat } from 'shared/reservation/fields/ReservationDateField';
import { toastSuccess, toastError } from 'shared/toast';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import { getMarketingRestaurantGql } from 'shared/gql/restaurants';
import { createReservationGuestCustomerGql } from 'shared/gql/reservations';
import { listAvailableReservationTimesGql } from 'shared/gql/reservation-times';

const yesterdayMoment = moment().subtract(1, 'days');
const futureMoment = moment().add(45, 'days');
const isValidDate = (currentDate) => {
  return currentDate.isAfter(yesterdayMoment) && currentDate.isBefore(futureMoment);
}

const CustomError = () => (
  <div className="customer-reservation-creation__form-container">
    <h4>Sorry! We've run into a bit of a glitch. Please try again later.</h4>
  </div>
);

const QueriedReservationTimesField = ({restaurant, partySize, reservationDate}) => {
  if (reservationDate == null) {
    return (
      <ReservationTimeField
        isLoading={false}
        selectableTimeSlots={[]}
        hasReservationDate={false}
      />
    );
  }

  const searchDate = moment(reservationDate, reservationDateFormat);

  return (
    <Query
      query={listAvailableReservationTimesGql}
      variables={{
        restaurant_id: restaurant.id,
        party_size: partySize,
        search_start_at: searchDate.toISOString(),
      }}
    >
      {({loading, error, data}) => {
        if (error) {
          return (<p>Could not retrieve available reservation times.</p>);
        }

        let selectableTimeSlots = [];

        if (!loading) {
          const localNow = moment();
          selectableTimeSlots = data.listAvailableReservationTimes
            .map(timeSlot => moment.tz(timeSlot, restaurant.timezone_name))
            .filter(momentTime => momentTime.isAfter(localNow));
        }

        return (
          <ReservationTimeField
            isLoading={loading}
            selectableTimeSlots={selectableTimeSlots}
            hasReservationDate={true}
          />
        );
      }}
    </Query>
  );
};

const CustomerCreateReservation = ({
  restaurant,
  onSubmit,
  onUpdateReservationDate,
}) => {
  if (restaurant.online === false) {
    return (
      <FadeInAnimation>
        <div className="customer-reservation-creation__form-container">
          <h1 className="text--light margin-bottom--8">
            Unfortunately, {restaurant.name} is not accepting reservations at this time.
          </h1>
          <p>
            We look forward to having you with us soon. Please be sure to check back on another date.
          </p>
        </div>
      </FadeInAnimation>
    )
  } else {
    const yesterdayMoment = moment().subtract(1, 'days');
    const futureMoment = moment().add(restaurant.online_days_in_advance, 'days');
    const isValidDate = (currentDate) => {
      return currentDate.isAfter(yesterdayMoment) && currentDate.isBefore(futureMoment);
    }
    return (
      <FadeInAnimation>
        <div className="customer-reservation-creation__form-container">
          <h1 className="text--light margin-bottom--8">
            Book your seats at {restaurant.name}
          </h1>
          <p>
            Please fill out the form below so we can reserve your seats for your next visit.
          </p>
          <hr className="divider"/>
          <Form
            onSubmit={onSubmit}
            render={({handleSubmit, pristine, invalid, form, errors, values}) => (
              <form
                className="rest-page__aside__form"
                onSubmit={(event) => handleSubmit(event).then(() => form.reset())}
              >
                <fieldset>
                  <NameField label="Full Name" />
                  <PhoneField label="Phone Number" />
                  <EmailField
                    label="Email Address"
                    labelRequired={false}
                  />
                  <PartySizeField
                    maxGuests={restaurant.max_party_size}
                    minGuests={restaurant.min_party_size}
                  />
                  <GridRow>
                    <GridCol m={5} l={6}>
                      <ReservationDateField isValidDate={isValidDate} />
                    </GridCol>
                    <GridCol m={4} l={6}>
                      <QueriedReservationTimesField
                        restaurant={restaurant}
                        partySize={values.party_size}
                        reservationDate={values.reservationDate}
                      />
                    </GridCol>
                  </GridRow>
                  <PartyNotesField
                    label="Reservation Notes"
                    labelRequired={false}
                  />
                </fieldset>
                <StackedSubmitCancelControls
                  submitText="Book Your Seats!"
                  loadingText="Booking"
                  isSubmitEnabled={!invalid}
                  isLoading={false}
                  isCancelable={false}
                />
              </form>
            )}
          />
        </div>
      </FadeInAnimation>
    );
  }
};

class QueriedCustomerCreateReservation extends Component {
  state = {
    reservationDate: null,
  };

  onUpdateReservationDate = (newDate) => {
    this.setState({reservationDate: newDate});
  };

  render() {
    return (
      <Query query={getMarketingRestaurantGql}>
        {({loading, error, data}) => {
          if (loading) return (<LoadingIndicator />);
          if (error) return (<CustomError />);

          const restaurant = data.getMarketingRestaurant;

          return (
            <Mutation mutation={createReservationGuestCustomerGql}>
              {(createReservationGuestCustomer) => {
                const onSubmit = (formValues) => {
                  const formattedFormValues = formValueFormatter(
                    formValues,
                    restaurant.timezone_name
                  );

                  const opQ = createReservationGuestCustomer({
                    variables: {
                      restaurant_id: restaurant.id,
                      ...formattedFormValues
                    }
                  });

                  opQ
                  .then((result) => {
                    const {reservation} = result.data.createReservationGuestCustomer;

                    const reservationAtMoment = moment.tz(reservation.scheduled_start_at, restaurant.timezone_name),
                    date = reservationAtMoment.format('MMMM D'),
                    time = reservationAtMoment.format('h:mm A');

                    toastSuccess(`Your reservation for on ${date} at ${time} is booked!`);
                  })
                  .catch((e) => {
                    console.log('e',e.graphQLErrors)
                    if(e.graphQLErrors) {
                      toastError(e.graphQLErrors[0].message);
                    } else {
                      toastError();
                    }
                  })

                  return opQ;
                };

                return (
                  <CustomerCreateReservation
                    restaurant={restaurant}
                    onSubmit={onSubmit}
                    onUpdateReservationDate={this.onUpdateReservationDate}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default QueriedCustomerCreateReservation;
