import React from 'react';
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { compose } from 'react-apollo';

import { Card } from 'shared/card';
import { FadeInAnimation } from 'shared/animations';
import { GridCol } from 'shared/layout/grid';
import PlansCalendar from './PlansCalendar';
import EditReservationPlan from './EditReservationPlan';
import CreateReservationPlan from './CreateReservationPlan';

const DefaultScheduleSettingsAside = () => (
  <div className="rest-settings__aside padding--16">
    To edit a scheduled plan or add a new one to the calendar, click on the plan or date to get started.
  </div>
);

export const ScheduleSection = ({
  reservationPlans,
  onChangeDate,
  currentDate,
  match,
  history,
}) => {
  return (
    <FadeInAnimation>
      <GridCol s={4} m={6} l={9} className="height--fl fade-in-appear ">
        <PlansCalendar
          reservationPlans={reservationPlans}
          onChangeDate={onChangeDate}
          currentDate={currentDate}
          history={history}
        />
      </GridCol>
      <GridCol s={4} m={3} l={3} className="fade-in-appear  height--fl--100">
        <div className="rest-settings__aside">
          <Card cardOverflow={true}>
            <header className="rest-page__aside__header rest-page__aside__header--sm">
              <h4>Schedule Settings</h4>
            </header>
            <Switch>
              <Route
                path={`${match.url}`}
                exact
                component={DefaultScheduleSettingsAside}
              />
              <Route
                path={`${match.url}/create/:date`}
                component={CreateReservationPlan}
              />
              <Route
                path={`${match.url}/edit/:id`}
                component={EditReservationPlan}
              />
            </Switch>
          </Card>
        </div>
      </GridCol>
    </FadeInAnimation>
  );
};

const RouteredScheduleSection = compose(withRouter)(ScheduleSection);

export default RouteredScheduleSection;
