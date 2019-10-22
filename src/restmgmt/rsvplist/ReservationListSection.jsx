import React from 'react';
import { Query } from 'react-apollo';
import * as classNames from 'classnames';

import GenericError from 'shared/generic-error/GenericError';
import GenericList from 'shared/list/GenericList';
import LoadingIndicator from 'shared/loading-indicator';
import { graphQlOp as listReservationsGql} from 'restmgmt/rsvplist/api.listReservations.query';
import ReservationChip from 'restmgmt/rsvplist/ReservationChip';
import ReservationListHeader from './ReservationListHeader';
import ReservationDetailLink from './ReservationDetailLink';
import ReservationTableAssignLink from './ReservationTableAssignLink';
import ReservationTableStatus from 'restmgmt/rsvplist/ReservationTableStatus';
import ActiveDateCurrentRestaurantQuery from 'restmgmt/shared/ActiveDateCurrentRestaurantQuery';

// NOTE: This static header height is inflexible. However, dynamically computing
// that by querying the ReservationListHeader for it's real height is
// significantly more complicated, and probably not worth the work at this point.
const HEADER_HEIGHT = '60px';

class ReservationListSection extends React.Component {
  componentDidMount() {
    this.props.onExpandedUpdate(
      this.props.category,
      this.props.defaultIsExpanded === false ? false : true
    );
  }

  render() {
    const {
      reservations,
      activeCount,
      totalCount,
      isExpanded,
    } = this.props;

    const toggleClassName = classNames({
      "rest-page__aside__res-list-item": true,
      "is-expanded": isExpanded,
    });

    let listHeight = HEADER_HEIGHT;
    if (isExpanded) {
      const percent = isExpanded ? ((1 / activeCount) * 100) : 0;

      listHeight = `calc(${percent}% - (${HEADER_HEIGHT} * ${totalCount - activeCount}))`;
    }

    return (
      <li
        className={toggleClassName}
        style={{ height: listHeight }}
      >
        <div className="rest-page__aside__res-list-item__container">
          <ReservationListHeader
            text={this.props.headerName}
            onClick={() => {
              const newIsExpanded = !isExpanded;
              this.props.onExpandedUpdate(this.props.category, newIsExpanded);
            }}
            reservations={reservations}
            isCollapseToggleVisible={true}
          />
          <div className="rest-page__aside__res-list-item__container--content">
            <GenericList
              className="rsvp-list"
              noResultsText="No reservations to display."
              list={reservations}
            >
              {(reservation) => (
                <li
                  className="rsvp-list__item"
                  key={reservation.id}
                >
                  <div className="rsvp-list__item--left">
                    <div
                      className="chip__list__item"
                      key={reservation.id}
                      >
                        <ReservationDetailLink
                          to={`/rm/rsvp_list/reservation/${reservation.id}/edit`}
                        >
                          <ReservationChip
                            reservation={reservation}
                          />
                        </ReservationDetailLink>
                    </div>
                  </div>
                  <ReservationTableAssignLink reservation={reservation}>
                    {({onClick}) => (
                      <ReservationTableStatus
                        reservation={reservation}
                        onClick={onClick}
                      />
                    )}
                  </ReservationTableAssignLink>
                </li>
              )}
            </GenericList>
          </div>
        </div>
      </li>
    );
  }
}

const QueriedReservationListSection = ({
  search_text,
  category,
  activeCount,
  totalCount,
  onExpandedUpdate,
  headerName,
  isExpanded,
  defaultIsExpanded,
}) => (
  <ActiveDateCurrentRestaurantQuery>
    {({restaurant, activeDate, beginningOfDay, endOfDay}) => {
      return (
        <Query
          query={listReservationsGql}
          variables={{
            search_text,
            category,
            scheduled_range_start_at: beginningOfDay.toISOString(),
            scheduled_range_end_at: endOfDay.toISOString()
          }}
        >
          {({loading, error, data: listReservationsData}) => {
            if (loading) return (<LoadingIndicator />);

            if (error) {
              console.error(error);
              return (<GenericError />);
            }

            return (
              <ReservationListSection
                headerName={headerName}
                category={category}
                reservations={listReservationsData.listReservations}
                activeCount={activeCount}
                totalCount={totalCount}
                onExpandedUpdate={onExpandedUpdate}
                isExpanded={isExpanded}
                defaultIsExpanded={defaultIsExpanded}
              />
            );
          }}
        </Query>
      );
    }}
  </ActiveDateCurrentRestaurantQuery>
);

export default QueriedReservationListSection;
