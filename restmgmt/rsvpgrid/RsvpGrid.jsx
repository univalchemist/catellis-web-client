import React, { Component, Fragment } from 'react';
import * as moment from 'moment-timezone';
import { NavLink } from 'react-router-dom';

import PopoutButton from 'shared/popout/PopoutButton';
import PopoutContainer from 'shared/popout/PopoutContainer';
import PopoutItem from 'shared/popout/PopoutItem';
import Popout from 'shared/popout/Popout';
import RsvpGridReservationLabel from 'restmgmt/rsvpgrid/RsvpGridReservationLabel';
import timeRangeBuilder from 'shared/time/time-range-builder';
import RestSectionBlankState from 'shared/restaurant/blank-state/RestSectionBlankState';
import { LoadingQuery } from 'shared/apollo';
import {graphQlOp as listReservationsGql} from 'restmgmt/rsvpgrid/api.listTableReservations.query';
import ActiveDateReservationPlansQuery from 'restmgmt/shared/ActiveDateReservationPlansQuery';
import buildProjectedMoment from 'shared/time/build-projected-moment';
import findBestReservationPlan from 'shared/reservation-plans/find-best-reservation-plan';

const styleStartX = { 'marginLeft': '0' };
const styleStartY = { 'marginTop': '0' };

const ReservationLabelContainer = ({restaurant, reservation, startTimeHours}) => {
  const reservationAtMoment = moment.tz(reservation.scheduled_start_at, restaurant.timezone_name);
  const stdReservationAtMnt = moment(reservationAtMoment.format('h:mm a'), 'h:mm a')
  const stdOpenAtMnt = moment(startTimeHours.format('h:mm a'), 'h:mm a')
  const duration = moment.duration(stdReservationAtMnt.diff(stdOpenAtMnt));
  const diffMinutes = parseInt(duration.asMinutes(), 10);

  return (
    <li
      className="rest-page__grid__reservation__label-container"
      key={reservation.id}
      style={{position: 'absolute', left: 64 * (diffMinutes/15)}}
    >
      <NavLink
        to={`/rm/rsvp_list/reservation/${reservation.id}/edit`}
        activeClassName="active"
      >
        <RsvpGridReservationLabel
          reservation={reservation}
        />
      </NavLink>
    </li>
  );
};

class RsvpGrid extends React.Component {
  state = {
    xAxis: styleStartX,
    yAxis: styleStartY,
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = (event) => {
    let container = event.target;

    let styleUpdateX = { 'marginLeft': -(container.scrollLeft) };
    let styleUpdateY = { 'marginTop': -(container.scrollTop) };

    this.setState({
      xAxis: styleUpdateX,
      yAxis: styleUpdateY
    });
  };

  render() {
    const {
      restaurant,
      reservationPlans,
      selectedReservationPlan,
      onSelectReservationPlan,
      collatedReservations,
      tables,
      startTimeHours,
      selectableTimeSlots,
    } = this.props;

    const hasMultipleReservationPlans = reservationPlans.length > 1;

    if (!tables.length) {
      // No floor plan could be found.
      return (
        <RestSectionBlankState
          title="No active floor layouts"
          description="Please create a floor layout or add one to your reservation plan"
          icon="restaurant"
          sectionDark="true"
        />
      );
    }

    return (
      <Fragment>
        <div className="rest-page__grid">
          <div className="rest-page__grid__container">
            <div className="rest-page__grid__x-container">
              <div className="rest-page__grid__x-axis" style={this.state.xAxis}>
                <ul>
                  <li>Tbl.</li>
                  {selectableTimeSlots.map((hourText, i) => (
                    <li key={i}>
                      <span>{hourText}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rest-page__grid__y-axis" style={this.state.yAxis}>
              <ul>
                {tables.map((table) => (
                  <li key={table.id}>
                    <span>{table.table_number}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              onScroll={this.handleScroll}
              id="grid-body"
              className="rest-page__grid__body"
            >
              <div className="rest-page__grid__cells">
                <div className="rest-page__grid__cells-structure" >
                  {tables.map((numberOfTables, t) => (
                    <ul
                      className="rest-page__grid__cells-row"
                      style={{width: 64 * selectableTimeSlots.length}}
                      key={t}
                    >
                      {selectableTimeSlots.map((numberOfHours, h) => (
                        <li className="rest-page__grid__cells--item" key={h}></li>
                      ))}
                    </ul>
                  ))}
                </div>
                <div className="rest-page__grid__reservation__container" >
                  {tables.map(table => {
                    const tableRsvps = collatedReservations[table.id];

                    return (
                      <ul
                        className="rest-page__grid__cells-row"
                        style={{width: 64 * selectableTimeSlots.length}}
                        key={table.id}
                      >
                        {tableRsvps && tableRsvps.map(reservation => (
                          <ReservationLabelContainer
                            key={reservation.id}
                            restaurant={restaurant}
                            reservation={reservation}
                            startTimeHours={startTimeHours}
                          />
                        ))}
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {hasMultipleReservationPlans && (
          <div className="rest-floor-create__section--toggle">
            <PopoutContainer
              button={(handleOnClick) => (
                <PopoutButton
                  text={selectedReservationPlan.name}
                  onClick={handleOnClick}
                />
              )}
              content={(isOpen, handleOnClick) => (
                <Popout isOpen={isOpen}>
                  {reservationPlans.map(reservationPlan => (
                    <PopoutItem
                      isActive={reservationPlan.id === selectedReservationPlan.id}
                      key={reservationPlan.id}
                      onClick={() => {
                        onSelectReservationPlan(reservationPlan.id);

                        handleOnClick();
                      }}
                    >
                      {reservationPlan.name}
                    </PopoutItem>
                  ))}
                </Popout>
              )}
            />
          </div>
        )}
      </Fragment>
    );
  }
}

class GridPlansController extends Component {
  state = {
    selectedReservationPlanId: null,
  };

  onSelectReservationPlan = (id) => {
    this.setState({selectedReservationPlanId: id});
  }

  static getDerivedStateFromProps(props, state) {
    if (props.reservationPlans.length) {
      // No reservation plan selected, but some are available,
      // so select the reservation plan that's closest to the
      // current time.
      const selectedReservationPlan = findBestReservationPlan(
        props.activeDate,
        props.reservationPlans
      );
      if (selectedReservationPlan == null) {
        return {selectedReservationPlanId: props.reservationPlans[0].id};
      }

      return {selectedReservationPlanId: selectedReservationPlan.id};
    }

    return null;
  }

  render() {
    const {
      restaurant,
      reservationPlans = [],
      activeDate,
    } = this.props;
    const { selectedReservationPlanId } = this.state;

    const selectedReservationPlan = reservationPlans.find(candidate => candidate.id === selectedReservationPlanId);

    const startTimeHours = moment(
      moment.tz(selectedReservationPlan.effective_time_start_at, 'UTC').format('h:mm a'),
      'h:mm a'
    );
    const endTimeHours = moment(
      moment.tz(selectedReservationPlan.effective_time_end_at, 'UTC').format('h:mm a'),
      'h:mm a'
    );
    let selectableTimeSlots = timeRangeBuilder(startTimeHours, endTimeHours, 15);
    selectableTimeSlots = selectableTimeSlots.map(timeSlotMoment => {
      if (timeSlotMoment.minutes() === 0) {
        return timeSlotMoment.format('h:mm A');
      }

      return '•';
    });

    const searchStart = buildProjectedMoment(
      activeDate,
      selectedReservationPlan.effective_time_start_at
    );
    const searchEnd = buildProjectedMoment(
      activeDate,
      selectedReservationPlan.effective_time_end_at
    );

    return (
      <LoadingQuery
        query={listReservationsGql}
        variables={{
          scheduled_range_start_at: searchStart.toISOString(),
          scheduled_range_end_at: searchEnd.toISOString()
        }}
      >
        {({data: listReservations}) => {
          const collatedReservations = listReservations.listReservations
          .reduce((collated, currRsvp) => {
            if (currRsvp.floor_plan_table && currRsvp.floor_plan_table.id) {
              collated[currRsvp.floor_plan_table.id] = [
                ...collated[currRsvp.floor_plan_table.id] || [],
                currRsvp
              ];
            }

            return collated;
          }, {});
          const tables = selectedReservationPlan.floor_plans
            .reduce((fpTables, floorPlan) => {
              return fpTables.concat(floorPlan.floor_plan_tables);
            }, [])

          return (
            <RsvpGrid
              restaurant={restaurant}
              selectedReservationPlan={selectedReservationPlan}
              reservationPlans={reservationPlans}
              collatedReservations={collatedReservations}
              tables={tables}
              startTimeHours={startTimeHours}
              selectableTimeSlots={selectableTimeSlots}
              onSelectReservationPlan={this.onSelectReservationPlan}
            />
          );
        }}
      </LoadingQuery>
    );
  }
}

const ActiveDateWrapper = () => (
  <ActiveDateReservationPlansQuery>
    {({restaurant, dailyReservationPlans, activeDate}) => {
      if (
        !dailyReservationPlans.length ||
        !dailyReservationPlans[0].reservation_plans.length
      ) {
        // No reservation plan could be found.
        return (
          <RestSectionBlankState
            title="No active reservation plans"
            description="Please create a reservation plan"
            icon="restaurant"
            sectionDark="true"
          />
        );
      }

      const reservationPlans = dailyReservationPlans[0].reservation_plans;

      return (
        <GridPlansController
          restaurant={restaurant}
          reservationPlans={reservationPlans}
          activeDate={activeDate}
        />
      );
    }}
  </ActiveDateReservationPlansQuery>
);

export default ActiveDateWrapper;
