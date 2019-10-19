import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import * as moment from 'moment-timezone';
import { MaterialIconButton } from 'shared/buttons';

import styles from 'stylesheets/settings/variables/_colors.scss';
import { getClassNamesForText } from 'shared/chip/color-builder';
import ActiveDateCurrentRestaurantQuery from 'restmgmt/shared/ActiveDateCurrentRestaurantQuery';
import ListDailyReservationPlansQuery from 'restmgmt/shared/ListDailyReservationPlansQuery';

// Configure BigCalendar localizer.
BigCalendar.momentLocalizer(moment);

function addTimeToDate(dateMoment, timeMoment) {
  const timeHours = timeMoment.get('hour');
  const timeMinutes = timeMoment.get('minute');

  return moment(dateMoment)
    .add(timeHours, 'hours')
    .add(timeMinutes, 'minutes');
}

function mapReservationPlansToVirtualizedDates(reservationPlanLists, timezoneName = 'UTC') {
  const virtualizedReservationPlans = [];

  reservationPlanLists.forEach(reservationPlanList => {
    const effectiveAtMoment = moment.tz(
      reservationPlanList.effective_at,
      timezoneName
    );

    reservationPlanList.reservation_plans.forEach(reservationPlan => {
      let rsvpPlanStartAtMoment = moment.tz(
        reservationPlan.effective_time_start_at,
        'UTC'
      );
      let rsvpPlanEndAtMoment = moment.tz(
        reservationPlan.effective_time_end_at,
        'UTC'
      );

      virtualizedReservationPlans.push({
        ...reservationPlan,
        rsvpPlanStartAt: addTimeToDate(effectiveAtMoment, rsvpPlanStartAtMoment),
        rsvpPlanEndAt: addTimeToDate(effectiveAtMoment, rsvpPlanEndAtMoment),
      })
    })
  });

  return virtualizedReservationPlans;
}

// Controls the event presentation (each RSVP plan, in this case)
const MonthEvent = ({event}) => {
  const classNames = getClassNamesForText(event.name, {event: true});

  return (
    <div className={classNames}>
      {event.name}
    </div>
  );
};

// Controls the day-of-week labels (Mon, Tue, etc.)
const MonthHeader = ({label}) => {
  return (
    <p>{label}</p>
  );
};

// Controls the day-of-month labels (1, 2, 3, etc.)
const MonthDateHeader = ({label}) => {
  return (
    <p>{label}</p>
  );
};

// Controls top toolbar (month label and next/prev buttons)
const CalendarToolbar = ({label, onNavigate}) => {
  return (
    <div className="res-schedule--calendar__header">
      <p className="res-schedule--calendar__header--left">{label}</p>
      <div className="res-schedule--calendar__header--right">
        <MaterialIconButton
          size="tiny"
          buttonStyle="default"
          onClick={() => onNavigate("PREV")}
          iconName="navigate_before"
          iconColor={styles.grayAlt1}
        />
        <MaterialIconButton
          size="tiny"
          buttonStyle="default"
          onClick={() => onNavigate("NEXT")}
          iconName="navigate_next"
          iconColor={styles.grayAlt1}
        />
      </div>
    </div>
  );
};

const PlansCalendar = ({
  reservationPlans,
  onChangeDate,
  currentDate,
  history
}) => (
  <BigCalendar
    className="res-schedule--calendar"
    events={reservationPlans}
    startAccessor="rsvpPlanStartAt"
    endAccessor="rsvpPlanEndAt"
    titleAccessor="name"
    views={['month']}
    onNavigate={onChangeDate}
    defaultDate={currentDate}
    components={{
      toolbar: CalendarToolbar,
      month: {
        event: MonthEvent,
        header: MonthHeader,
        dateHeader: MonthDateHeader,
      }
    }}
    selectable
    onSelectEvent={(event) => {
      history.push(`/rm/restaurant_settings/general/schedule/edit/${event.id}`);
    }}
    onSelectSlot={(slotInfo) => {
      const selectedDate = moment(slotInfo.start);
      history.push(
        `/rm/restaurant_settings/general/schedule/create/${selectedDate.format('YYYY-MM-DD')}`
      );
    }}
  />
);

const RouteredPlansCalendar = compose(withRouter)(PlansCalendar);

class QueriedPlansCalendar extends React.Component {
  state = {
    currentDateMoment: moment(),
  }

  onChangeDate = (newDate) => {
    this.setState({
      currentDateMoment: moment(newDate)
    });
  }

  render() {
    const { currentDateMoment } = this.state;
    const currentMonthStartMoment = currentDateMoment.clone().tz('UTC').startOf('month');
    const currentMonthEndMoment = currentDateMoment.clone().tz('UTC').endOf('month');

    return (
      <ActiveDateCurrentRestaurantQuery>
        {({restaurant}) => (
          <ListDailyReservationPlansQuery
            searchStart={currentMonthStartMoment}
            searchEnd={currentMonthEndMoment}
          >
            {({data: listDailyReservationPlans})=>{
              const reservationPlans = mapReservationPlansToVirtualizedDates(
                listDailyReservationPlans,
                restaurant.timezone_name,
              );

              return (
                <RouteredPlansCalendar
                  reservationPlans={reservationPlans}
                  onChangeDate={this.onChangeDate}
                  currentDate={currentDateMoment.toDate()}
                />
              );
            }}
          </ListDailyReservationPlansQuery>
        )}
      </ActiveDateCurrentRestaurantQuery>
    );
  }
}

export default QueriedPlansCalendar;
