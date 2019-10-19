import React, { Component, Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import * as moment from 'moment-timezone';

import { FadeInZoomAnimation } from 'shared/animations';
import PopoutButton from 'shared/popout/PopoutButton';
import PopoutContainer from 'shared/popout/PopoutContainer';
import PopoutItem from 'shared/popout/PopoutItem';
import Popout from 'shared/popout/Popout';
import LoadingIndicator from 'shared/loading-indicator';
import FloorPlanLayout from 'restmgmt/rest-settings/floor-plans/FloorPlanEditor/FloorPlanLayout';
import StaticTableIcon from 'restmgmt/rest-settings/floor-plans/FloorPlanEditor/StaticTableIcon';
import { graphQlOp as listReservationsGql } from 'restmgmt/rsvplist/api.listReservations.query';
import RestSectionBlankState from 'shared/restaurant/blank-state/RestSectionBlankState';
import GenericError from 'shared/generic-error/GenericError';
import ActiveDateReservationPlansQuery from 'restmgmt/shared/ActiveDateReservationPlansQuery';
import GetFloorPlanStateQuery from 'restmgmt/shared/GetFloorPlanStateQuery';
import findBestReservationPlan from 'shared/reservation-plans/find-best-reservation-plan';
import { setSelectedReservationPlanFloorPlanGql } from 'shared/gql/local-restmgmtstate';

class FloorPlanView extends Component {
  state = {
    isLoading: true,
  };

  onSelectFloorPlan(reservationPlanId, floorPlanId) {
    this.setState(
      {isLoading: true},
      () => {
        const opQ = this.props.onSelectFloorPlan({
          floorPlanId,
          reservationPlanId,
        });

        opQ.then(() => {
          this.setState({isLoading: false})
        });
      }
    );
  }

  componentDidMount() {
    const {
      reservationPlans,
      activeDate,
    } = this.props;

    const hasValidReservationPlanId = this.props.reservationPlans
      .some(rsvpPlan => rsvpPlan.id === this);

    if (!hasValidReservationPlanId) {
      // Find the best available reservation plan
      const selectedReservationPlan = findBestReservationPlan(
        activeDate,
        reservationPlans,
      );

      if (selectedReservationPlan == null) {
        this.onSelectFloorPlan(null, null);
      } else {
        // Get the first floor plan.
        const firstFloorPlan = selectedReservationPlan.floor_plans[0];

        this.onSelectFloorPlan(selectedReservationPlan.id, firstFloorPlan.id);
      }
    } else {
      this.setState({isLoading: false});
    }
  }

  render() {
    if (this.state.isLoading) {
      return (<LoadingIndicator />);
    }

    const {
      selectedFloorPlanId,
      selectedReservationPlanId,
      reservationPlans = [],
      reservations,
    } = this.props;

    if (reservationPlans.length < 1) {
      // No reservation plans could be found.
      return (
        <RestSectionBlankState
          title="No active reservation plans"
          description="Please create a reservation schedule for this day"
          icon="restaurant"
          sectionDark="true"
        />
      );
    }

    const allFloorPlans = reservationPlans.reduce((allFloorPlans, reservationPlan) => {
      return allFloorPlans.concat(reservationPlan.floor_plans);
    }, []);

    const floorPlan = allFloorPlans.find(floorPlan => floorPlan.id === selectedFloorPlanId);

    if (floorPlan == null) {
      // No floor plan could be found.
      return (
        <RestSectionBlankState
          title="No active floor layouts"
          description="Please create a floor layout or add one to your reservation schedule"
          icon="restaurant"
          sectionDark="true"
        />
      );
    }

    return (
      <Fragment>
        <FadeInZoomAnimation>
          <div className="rest-floor-create__section height--fl">
            <FloorPlanLayout
              tables={floorPlan.floor_plan_tables}
              tableRender={(table) => {
                const tableReservations = reservations.filter(reservation => {
                  return (
                      reservation.floor_plan_table &&
                      reservation.floor_plan_table.id === table.id
                  );
                });

                return (
                  <StaticTableIcon
                    key={table.id}
                    {...table}
                    reservations={tableReservations}
                  />
                );
              }}
            />
          </div>
        </FadeInZoomAnimation>
        <div className="rest-floor-create__section--toggle">
          <PopoutContainer
            button={(handleOnClick) => (
              <PopoutButton
                text={floorPlan.name}
                onClick={handleOnClick}
              />
            )}
            content={(isOpen) => (
              <Popout isOpen={isOpen}>
                {/* TODO: Add accessibility to popout */}
                {reservationPlans.map(reservationPlan => (
                  <Fragment key={reservationPlan.id}>
                    <label className="margin-reset--bottom">{reservationPlan.name}</label>
                    {reservationPlan.floor_plans.map(selectableFloorPlan => (
                      <PopoutItem
                        isActive={selectableFloorPlan.id === floorPlan.id && reservationPlan.id === selectedReservationPlanId}
                        key={selectableFloorPlan.id}
                        onClick={() => this.onSelectFloorPlan(reservationPlan.id, selectableFloorPlan.id)}
                      >
                        {selectableFloorPlan.name}
                      </PopoutItem>
                    ))}
                  </Fragment>
                ))}
              </Popout>
            )}
          />
        </div>
      </Fragment>
    );
  }
}

const QueriedFloorPlanView = () => {
  return (
    <ActiveDateReservationPlansQuery>
      {({restaurant, dailyReservationPlans, beginningOfDay, endOfDay, activeDate}) => {
        let reservations = [];
        const reservationPlans = dailyReservationPlans[0].reservation_plans;

        return (
          <GetFloorPlanStateQuery>
            {({data: floorPlanState}) => {
              const {
                selectedFloorPlanId,
                selectedReservationPlanId,
              } = floorPlanState;

              const searchStartAt = moment.tz(restaurant.timezone_name);

              return (
                <Query
                  query={listReservationsGql}
                  variables={{
                    category: "upcoming,waitlist,seated",
                    scheduled_range_start_at: searchStartAt.toISOString(),
                    scheduled_range_end_at: endOfDay.toISOString(),
                  }}
                  pollInterval={3 * 60 * 1000}
                >
                  {({loading, error, data}) => {
                    // if (loading) return (<LoadingIndicator />);

                    if (loading === false) {
                      reservations = data.listReservations;
                    }

                    if (error) {
                      console.error(error);
                      return (<GenericError />);
                    }

                    return (
                      <Mutation mutation={setSelectedReservationPlanFloorPlanGql}>
                        {(setSelectedReservationPlanFloorPlan) => (
                          <FloorPlanView
                            selectedFloorPlanId={selectedFloorPlanId}
                            selectedReservationPlanId={selectedReservationPlanId}
                            reservationPlans={reservationPlans}
                            reservations={reservations}
                            onSelectFloorPlan={({reservationPlanId, floorPlanId}) => {
                              return setSelectedReservationPlanFloorPlan({
                                variables: {
                                  floorPlanId,
                                  reservationPlanId,
                                  foo: 'bar'
                                }
                              });
                            }}
                          />
                        )}
                      </Mutation>
                    );
                  }}
                </Query>
              );
            }}
          </GetFloorPlanStateQuery>
        );
      }}
    </ActiveDateReservationPlansQuery>
  );
};

export default QueriedFloorPlanView;
