import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Form } from 'react-final-form';
import MaterialIcon from 'material-icons-react';
import styles from 'stylesheets/settings/variables/_colors.scss';
import swal from 'sweetalert';


import { FadeUpAnimation } from 'shared/animations';
import StackedSubmitCancelControls from 'shared/form/StackedSubmitCancelControls';
import ReservationFormSegment from 'restmgmt/rsvplist/ReservationFormSegment';
import { getReservationGql } from 'shared/gql/reservations';
import { graphQlOp as editReservationGql } from 'restmgmt/rsvplist/api.editReservation.mutation';
import { Avatar } from 'shared/avatar/Avatar';
import { toastSuccess, toastError } from 'shared/toast';
import { CardSectionDivider } from 'shared/card';
import restaurantLocalDatetime from 'shared/time/restaurant-local-datetime';
import LocalReservationTime from 'restmgmt/rsvplist/LocalReservationTime';
import formValueFormatter from 'restmgmt/rsvplist/reservation-form-value-formatter';
import AsideHeaderBackHistory from 'restmgmt/shared/AsideHeaderBackHistory';
import { opName as listReservationsOpName } from 'restmgmt/rsvplist/api.listReservations.query';
import Badge from 'shared/badge/Badge';
import { LoadingQuery } from 'shared/apollo';

function customerTags(tag) {
  if (tag && tag.trim().length > 0) {
    return (
      <MaterialIcon icon="local_offer" size={12} color={styles.blueBase} />
    );
  }

  return null;
}

function chipTapped(name, phone, email, tags) {
  let string_info = []
  if(phone != null){
    phone = phone.slice(0,3)+"-"+phone.slice(3,6)+"-"+phone.slice(6)
    string_info.push("Phone Number: " + phone + "\n")
  }
  if(email != null){
    string_info.push("Email: " + email + "\n")
  }
  if(tags != null){
    string_info.push("Tags: " + tags + "\n")
  }

    swal(name, string_info.join(""), "info", {
      button: "Dismiss",
    });

}

class ReservationDetailEdit extends Component {
  render() {
    const {reservation, onUpdate, onCancel} = this.props;
    const isTableConflicted = reservation.table_conflicted === true;

    const isLoading = false;

    const localOnUpdate = (formValues) => {
      const formattedFormValues = formValueFormatter(
        formValues,
        reservation.restaurant.timezone_name
      );
      return onUpdate(formattedFormValues);
    }

    const formValues = {
      reservationDate: restaurantLocalDatetime(reservation.restaurant, reservation.scheduled_start_at).format('dddd, MMMM D, YYYY'),
      party_size: reservation.party_size,
      reservationTime: restaurantLocalDatetime(reservation.restaurant, reservation.scheduled_start_at).format('h:mm a'),
      reservation_status: reservation.reservation_status,
      party_notes: reservation.party_notes,
      floor_plan_table_id: reservation.floor_plan_table != null
        ? reservation.floor_plan_table.id
        : null,
      tags: reservation.tags,
      override_turn_time: reservation.override_turn_time
    };

    return (
      <Fragment>
        <AsideHeaderBackHistory
          ariaLabel='back-to-all-reservations'
        />
        <div className="rest-page__aside__form card__overflow-container">
          <div className="rest-page__aside__body">
            {isTableConflicted && (
              <Badge text="Table assignment overlap conflict." />
            )}
            <FadeUpAnimation>
              <div className="text--center" onClick={() => {chipTapped(reservation.customer.name, reservation.customer.phone_number, reservation.customer.email, reservation.customer.tags)}}>
                <Avatar size="xxlg" avatarText={reservation.customer.name} />
                <h4 className="margin-top--8 margin-bottom--8">{reservation.customer.name} {customerTags(reservation.customer.tags)}</h4>
                <p className="margin-reset--bottom">
                  Reservation: <LocalReservationTime reservation={reservation} />  |  Guests: {reservation.party_size}
                </p>
                <p className="margin-reset--bottom">
                  Entered by {reservation.employee}
                </p>
              </div>
              <CardSectionDivider />
              <Form
                onSubmit={localOnUpdate}
                initialValues={formValues}
                render={({handleSubmit, pristine, invalid, form}) => (
                  <form
                    onSubmit={(event) => handleSubmit(event).then(() => form.reset())}
                  >
                    <ReservationFormSegment restaurant={reservation.restaurant}/>
                    <StackedSubmitCancelControls
                      submitText="Update"
                      loadingText="Updating"
                      isSubmitEnabled={!pristine && !invalid}
                      isLoading={isLoading}
                      onCancel={onCancel}
                    />
                  </form>
                )}
              />
            </FadeUpAnimation>
          </div>
        </div>
      </Fragment>
    );
  }
}

const QueriedReservationDetailEdit = ({
  reservationId,
  onCancel,
}) => {
  return (
    <LoadingQuery
      query={getReservationGql}
      variables={{
        id: reservationId
      }}
    >
      {({data: getReservation}) => {
        return (
          <Mutation
            mutation={editReservationGql}
            refetchQueries={[listReservationsOpName]}
          >
            {(update, mutateProps) => {
              const onRequestUpdate = (formValues) => {
                const args = {
                  variables: {
                    input: {
                      ...formValues,
                      id: reservationId
                    }
                  }
                };
                console.log('args', args)

                const opQ = update(args)
                .then(() => {
                  toastSuccess(`Success! The reservation has been updated.`);
                })
                .catch((err) => {
                  toastError();
                })
                .then(() => {
                  onCancel();
                });

                return opQ;
              }

              return (
                <ReservationDetailEdit
                  reservation={getReservation.getReservation}
                  onUpdate={onRequestUpdate}
                  onCancel={onCancel}
                />
              );
            }}
          </Mutation>
        );
      }}
    </LoadingQuery>
  );
}

export default QueriedReservationDetailEdit;
