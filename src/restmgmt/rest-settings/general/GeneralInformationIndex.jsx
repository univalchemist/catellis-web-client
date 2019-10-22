import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import {
  Card,
  CardHeaderNav,
  CardHeaderNavList,
  CardHeaderNavItem
} from 'shared/card';

import RestaurantSettings from './restaurant-settings/RestaurantSettings';
import FloorPlansSection from './FloorPlansSection';
import ScheduleSection from './schedule-section';
import NotificationsSection from './NotificationsSection';
import TurnTimeSection from './TurnTimeSection';
import { FadeInAnimation } from 'shared/animations';


class GeneralInformationIndex extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Card size="md" cardOverflow={true}>
        <FadeInAnimation>
          <header className="rest-page__section__header">
            <h4 className="margin--reset">Restaurant Information</h4>
          </header>
          <CardHeaderNav>
            <CardHeaderNavList>
              <CardHeaderNavItem
                itemTitle="General Settings"
                itemUrl="/rm/restaurant_settings/general/restaurant"
                itemIcon="store"
              />
              <CardHeaderNavItem
                itemTitle="Reservation Schedule"
                itemUrl="/rm/restaurant_settings/general/schedule"
                itemIcon="date_range"
              />
              <CardHeaderNavItem
                itemTitle="Turn Time"
                itemUrl="/rm/restaurant_settings/general/turn-time"
                itemIcon="restore"
              />
              <CardHeaderNavItem
                itemTitle="Floor Plans"
                itemUrl="/rm/restaurant_settings/general/floor_plans"
                itemIcon="event_seat"
              />
              <CardHeaderNavItem
                itemTitle="Notifications"
                itemUrl="/rm/restaurant_settings/general/notifications"
                itemIcon="sms"
              />
            </CardHeaderNavList>
          </CardHeaderNav>
          <div className="rest-page__section__body">
            <Switch>
              <Route
                path={`${match.url}`}
                exact
              >
                <Redirect to={`${match.url}/restaurant`} />
              </Route>
              <Route
                path={`${match.url}/restaurant`}
                exact
                component={RestaurantSettings}
              />
              <Route
                path={`${match.url}/schedule`}
                component={ScheduleSection}
              />
              <Route
                path={`${match.url}/floor_plans`}
                exact
                component={FloorPlansSection}
              />
              <Route
                path={`${match.url}/notifications`}
                exact
                component={NotificationsSection}
              />
              <Route
                path={`${match.url}/turn-time`}
                exact
                component={TurnTimeSection}
              />
            </Switch>
          </div>
        </FadeInAnimation>
      </Card>
    );
  }
}

export default GeneralInformationIndex;
