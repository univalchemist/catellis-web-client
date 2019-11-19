import React, { Component, Fragment } from 'react';
import {Mutation, withApollo} from 'react-apollo';
import * as moment from 'moment-timezone';

import { FadeUpAnimation } from 'shared/animations';
import ReservationChip from 'restmgmt/rsvplist/ReservationChip';
import { Avatar } from 'shared/avatar/Avatar';
import LocalReservationTime from 'restmgmt/rsvplist/LocalReservationTime';
import { Button } from 'shared/buttons';
import ReservationTableAssignLink from './ReservationTableAssignLink';
import ActiveDateCurrentRestaurantQuery from 'restmgmt/shared/ActiveDateCurrentRestaurantQuery';
import { graphQlOp as listReservationsGql } from 'restmgmt/rsvplist/api.listReservations.query';
import { LoadingQuery } from 'shared/apollo';
import { 
  findCurrentReservation,
  findUpcomingReservations,
	hasTablesConflicts,
  findSeatReservations
} from 'restmgmt/shared/reservation-filters';
import { graphQlOp as editReservationGql } from 'restmgmt/rsvplist/api.editReservation.mutation';
import { reservationDateFormat } from 'shared/reservation/fields/ReservationDateField';

const CurrentReservation = ({reservation}) => {
  return (
    <Mutation
      mutation={editReservationGql}
      refetchQueries={['TableUpcomingReservations']}
    >
      {(editReservation, { loading }) => {
        const completeReservation = () => {
          editReservation({
            variables: {
              input: {
                id: reservation.id,
                reservation_status: 'complete'
              }
            }
          })
        };

        return (
          <div className="rest-page__aside__body rest-page__aside__body--border-btm rest-page__aside__form">
            <div className="text--center">
              <Avatar size="xxlg" avatarText={reservation.customer.name} />
              <h4 className="margin-top--8 margin-bottom--8">{reservation.customer.name}</h4>
              <p>
                Reservation: <LocalReservationTime reservation={reservation} />  |  Guests: {reservation.party_size}
              </p>
            </div>
            <Button
              size="fl"
              buttonStyle="secondary"
              disabled={loading}
              onClick={completeReservation}
            >
              Complete Reservation
            </Button>
            <div className="margin-top--16 text--center">
              <ReservationTableAssignLink reservation={reservation}>
                {({onClick}) => (
                  <Button
                    size="fl"
                    buttonStyle="secondary"
                    onClick={onClick}
                  >
                    Reassign
                  </Button>
                )}
              </ReservationTableAssignLink>
            </div>
          </div>
        );
      }}
    </Mutation>
  );
}

export class TableDetailSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: props.reservations
    }
  }
  componentDidMount() {
    console.log(this.props)
  }

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
  onClickBtnSeat = async (reservations, reservation) => {
    const seatReservations = findSeatReservations(reservations);

    const reservationDate = moment().format('dddd, MMMM D, YYYY');
    const reservationTime = moment().format('h:mm a');
    const timezoneName = this.props.restaurant.timezone_name;
    const reservationAtMoment = moment.tz(
        `${reservationDate} ${reservationTime}`,
        `${reservationDateFormat} h:mm a`,
        timezoneName
    );

    const seated_at = reservationAtMoment.toISOString();
    try {
      const promises = seatReservations.map(r => this.onChangeReservationToComplete(r));
      await Promise.all(promises);
      await this.props.client.mutate({
        mutation: editReservationGql,
        variables: {
          input: {
            id: reservation.id,
            reservation_status: 'seated',
            seated_at
          }
        }
      });
      const reservations = this.state.reservations.filter(r => { return r.id !== reservation.id});
      this.setState({ reservations });
    } catch (e) {
      console.log('super onClick button Seat error', e);
    }
  };
  render() {
    const {
      floorPlanTable,
    } = this.props;
    const { reservations } = this.state;
    const currentReservation = findCurrentReservation(reservations);
    const upcomingReservations = findUpcomingReservations(reservations);
		const isConflicted = hasTablesConflicts(reservations);

    return (
      <Fragment>
        <FadeUpAnimation>
        <header className="rest-page__aside__res-list-item__header rest-page__aside__res-list-item__header--border-top">
          <h4>Table {floorPlanTable.table_number} Details</h4>
        </header>
        <div className="table-details__body">
          {currentReservation && (
            <div className="row margin-bottom--24">
              <CurrentReservation reservation={currentReservation} />
            </div>
          )}
          <div className="row">
            <p className="text--bold">Upcoming Reservations</p>
            <ul>
              {upcomingReservations.length === 0 && (
                <p className="text--gray-med">No reservations to display.</p>
              )}
              {upcomingReservations.map(reservation => (
                <li className="chip__list__item" key={reservation.id}>
                  <ReservationTableAssignLink reservation={reservation}>
                    {({onClick}) => (
                      <ReservationChip
                          reservation={reservation}
                          btnSeat={true}
                          onClickBtnSeat={() => this.onClickBtnSeat(reservations, reservation)}
                      />
                    )}
                  </ReservationTableAssignLink>
                </li>
              ))}
            </ul>
            <hr className="margin-top--24 margin-bottom--24" />
          </div>
          <div className="row">
            <p className="text--bold">Table Conflicts</p>
            {isConflicted ? (
              <p className="text--gray-med">
                It looks like at least two reservations conflict. To reassign a party simply select it to view the table from their perspective. This way you can assign a new table and remove the conflict.
              </p>
            ) : (
              <p className="text--gray-med">No table conflicts at the moment.</p>
            )}
          </div>
        </div>
        </FadeUpAnimation>
      </Fragment>
    );
  }
}

const QueriedTableDetailSection = ({floorPlanTable, ...props}) => (
  <ActiveDateCurrentRestaurantQuery>
    {({restaurant, activeDate, beginningOfDay, endOfDay}) => {
      const searchStartAt = moment.tz(moment(), restaurant.timezone_name);

      return (
        <LoadingQuery
          query={listReservationsGql}
          variables={{
            category: "upcoming,waitlist,seated",
            scheduled_range_start_at: searchStartAt.toISOString(),
            scheduled_range_end_at: endOfDay.toISOString(),
            floor_plan_table_id: floorPlanTable.id,
          }}
          fetchPolicy='cache-and-network'
        >
          {({data}) => {
            const reservations = data.listReservations;

            return (
              <TableDetailSection
                floorPlanTable={floorPlanTable}
                reservations={reservations}
                restaurant={restaurant}
                {...props}
              />
            );
          }}
        </LoadingQuery>
      );
    }}
  </ActiveDateCurrentRestaurantQuery>
);

export default withApollo(QueriedTableDetailSection);
