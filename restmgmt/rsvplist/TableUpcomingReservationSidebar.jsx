import React, { Component, Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import * as moment from 'moment-timezone';

import GenericError from 'shared/generic-error/GenericError';
import LoadingIndicator from 'shared/loading-indicator';
import AsideHeaderClose from 'restmgmt/shared/AsideHeaderClose';
import ReservationListHeader from './ReservationListHeader';
import ReservationChip from 'restmgmt/rsvplist/ReservationChip';
import {graphQlOp as setFloorPlanSelectedTableGql } from 'restmgmt/store/operations/local.setFloorPlanSelectedTable.mutation';
import { DefaultNoResults } from 'shared/no-results/NoResults';
import { Avatar } from 'shared/avatar/Avatar';
import LocalReservationTime from 'restmgmt/rsvplist/LocalReservationTime';
import { Button } from 'shared/buttons';
import { graphQlOp as editReservationGql } from 'restmgmt/rsvplist/api.editReservation.mutation';
import ReservationDetailLink from './ReservationDetailLink';
import ActiveDateCurrentRestaurantQuery from 'restmgmt/shared/ActiveDateCurrentRestaurantQuery';
import { graphQlOp as listReservationsGql} from 'restmgmt/rsvplist/api.listReservations.query';

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
              <ReservationDetailLink to={`/rm/rsvp_list/${reservation.id}`}>
                More Details
              </ReservationDetailLink>
            </div>
          </div>
        );
      }}
    </Mutation>
  );
}

export class TableUpcomingReservationSidebar extends Component {
  render() {
    const {
      reservations,
      unselectTable,
    } = this.props;

    let filteredReservations = reservations;
    const currentReservation = filteredReservations
      .find(reservation => reservation.reservation_status === 'seated');

    // filter out current reservation, if one is present
    if (currentReservation) {
      filteredReservations = filteredReservations
        .filter(reservation => reservation.id !== currentReservation.id);
    }

    return (
      <Fragment>
        <AsideHeaderClose
          onClickClose={unselectTable}
        />
        {currentReservation && (
          <CurrentReservation reservation={currentReservation} />
        )}
        <ReservationListHeader
            text="Upcoming"
            reservations={filteredReservations}
          />
          <ul className="rest-page__aside__body rest-page__aside__body--footer rest-page__aside__body--pad-sm chip__list">
            {filteredReservations.length === 0 && (
              <DefaultNoResults text="No reservations to display." />
            )}
            {filteredReservations.map(reservation => (
              <li className="chip__list__item" key={reservation.id}>
                <ReservationDetailLink to={`/rm/rsvp_list/${reservation.id}`}>
                  <ReservationChip reservation={reservation} />
                </ReservationDetailLink>
              </li>
            ))}
          </ul>
      </Fragment>
    );
  }
}

const QueriedTableUpcomingReservationsSidebar = ({tableId}) => (
  <ActiveDateCurrentRestaurantQuery>
    {({restaurant, activeDate, beginningOfDay, endOfDay}) => {
      const searchStartAt = moment.tz(restaurant.timezone_name);

      return (
        <Query
          query={listReservationsGql}
          variables={{
            category: "upcoming,waitlist,seated",
            scheduled_range_start_at: searchStartAt.toISOString(),
            scheduled_range_end_at: endOfDay.toISOString(),
            floor_plan_table_id: tableId
          }}
          fetchPolicy='cache-and-network'
        >
          {({loading, error, data}) => {
            if (loading) return (<LoadingIndicator />);

            if (error) {
              console.error(error);
              return (<GenericError />);
            }

            const reservations = data.listReservations;

            return (
              <Mutation mutation={setFloorPlanSelectedTableGql}>
                {(setFloorPlanSelectedTable) => {
                  const unselectTable = () => {
                    setFloorPlanSelectedTable({variables:{id: null}});
                  }

                  return (
                    <TableUpcomingReservationSidebar
                      reservations={reservations}
                      unselectTable={unselectTable}
                      restaurant={restaurant}
                    />
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      );
    }}
  </ActiveDateCurrentRestaurantQuery>
);

export default QueriedTableUpcomingReservationsSidebar;
