import React, { Component, Fragment } from 'react';
import { compose } from 'react-apollo';
import * as moment from 'moment-timezone';
import * as _get from 'lodash.get';

import ReservationListSection from 'restmgmt/rsvplist/ReservationListSection';
import { FadeInAnimation } from 'shared/animations';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import reservationsQueryWrapper from 'restmgmt/rsvplist/api.listReservations.query';
import getActiveDateWrapper from 'restmgmt/store/operations/local.getActiveDate.query';
import getCurrentRestaurantQueryWrapper from 'restmgmt/rest-settings/api.getCurrentRestaurant.query';
import customersQueryWrapper from 'restmgmt/customers/api.listCustomers.query';
import ReservationListContainer from './ReservationListContainer';

class ReservationsList extends Component {
  render() {
    const {
      loading = false,
      listReservations: reservations,
    } = this.props.reservations;

    if (loading || !reservations) {
      return (<LoadingIndicator />);
    }

    let reservationListItemContent;
    if (this.props.category === "upcoming") {
      reservationListItemContent = (
        <ReservationListContainer>
          {({activeCount, totalCount, onExpandedUpdate, getChildIsExpanded}) => (
            <Fragment>
              <ReservationListSection
                category="upcoming"
                headerName="Upcoming"
                activeCount={activeCount}
                totalCount={totalCount}
                isExpanded={getChildIsExpanded('upcoming')}
                onExpandedUpdate={onExpandedUpdate}
                search_text={this.props.search_text}
              />
              <ReservationListSection
                category="waitlist"
                headerName="Waitlist"
                activeCount={activeCount}
                totalCount={totalCount}
                defaultIsExpanded={false}
                isExpanded={getChildIsExpanded('waitlist')}
                onExpandedUpdate={onExpandedUpdate}
                search_text={this.props.search_text}
              />
            </Fragment>
          )}
        </ReservationListContainer>
      );
    } else {
      reservationListItemContent = (
        <ReservationListContainer>
          {({activeCount, totalCount, onExpandedUpdate, getChildIsExpanded}) => (
            <Fragment>
              <ReservationListSection
                category="seated"
                headerName="Seated"
                activeCount={activeCount}
                totalCount={totalCount}
                isExpanded={getChildIsExpanded('seated')}
                onExpandedUpdate={onExpandedUpdate}
                search_text={this.props.search_text}
              />
              <ReservationListSection
                category="complete"
                headerName="Completed"
                activeCount={activeCount}
                totalCount={totalCount}
                defaultIsExpanded={false}
                isExpanded={getChildIsExpanded('complete')}
                onExpandedUpdate={onExpandedUpdate}
                search_text={this.props.search_text}
              />
            </Fragment>
          )}
        </ReservationListContainer>
      );
    }

    return (
      <FadeInAnimation>
        <ul className="rest-page__aside__res-list">
          {reservationListItemContent}
        </ul>
      </FadeInAnimation>
    );
  }
}

// TODO: Are any of these queries necessary?
export default compose(
  getActiveDateWrapper('getActiveDate'),
  getCurrentRestaurantQueryWrapper('restaurant'),
  customersQueryWrapper('customers'),
  reservationsQueryWrapper(
    'reservations',
    {
      options: ({
        search_text,
        category,
        restaurant: {getCurrentRestaurant: restaurant},
        ...props
      }) => {
        // TODO: We need to check whether activeDate is available, or if the
        //  local state query is still loading.
        // There might be a better way to handle this...
        let activeDate = _get(
          props,
          'getActiveDate.restMgmtState.activeDate',
          moment().toISOString()
        );

        // TODO: This wrapper relies on a Restaurant value being present.
        //  We currently hack around that by using a fallback, but a more
        //  evolved implementation would throw into some kind of loading state
        //  until the 'restaurant' query is resolved.
        const timezoneName = !!restaurant ? restaurant.timezone_name : 'UTC';

        const beginningOfDay = moment.tz(activeDate, timezoneName).startOf('day');
        const endOfDay = moment.tz(activeDate, timezoneName).endOf('day');

        return {
          variables: {
            search_text,
            category,
            scheduled_range_start_at: beginningOfDay.toISOString(),
            scheduled_range_end_at: endOfDay.toISOString()
          },
          fetchPolicy: 'cache-and-network'
        };
      }
    }
  ),
)(ReservationsList);
