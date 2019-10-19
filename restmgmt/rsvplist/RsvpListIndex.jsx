import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { Card } from 'shared/card/Card';
import RestaurantMgmtLayout from 'shared/layout/RestaurantMgmtLayout';
import ReservationDetailEdit from 'restmgmt/rsvplist/ReservationDetailEdit';
import ReservationCreate from 'restmgmt/rsvplist/ReservationCreate';
import ReservationsHeader from 'restmgmt/rsvplist/ReservationsHeader';
import FloorPlanView from 'restmgmt/rsvplist/FloorPlanView';
import ReservationsListSidebar from './ReservationsListSidebar';
import TableDetail from './TableDetail';
import ReservationTableAssign from './ReservationTableAssign';

class RsvpListIndex extends React.Component {
  render() {
    const { match } = this.props;
    const baseUrl = match.url;

    return (
      <RestaurantMgmtLayout
        header={() => (
          <ReservationsHeader />
        )}
        sidebar={() => (
          <Card size="md" cardOverflow={true} heightFull={true}>
            <Switch>
              {/* Redirect default to RSVP list (upcoming) */}
              <Route
                path={`${match.url}`}
                exact
              >
                <Redirect to={`${match.url}/upcoming`} />
              </Route>
              {/* RSVP list (upcoming, seated) */}
              <Route
                path={`${match.url}/:category(seated|upcoming)`}
                component={ReservationsListSidebar}
              />
              {/* Create RSVP */}
              <Route
                path={`${match.url}/create`}
                component={ReservationCreate}
              />
              {/* RSVP details/edit */}
              <Route
                path={`${match.url}/reservation/:reservation_id/edit`}
                render={({match, history}) => {
                  const onCancel = () => history.goBack();

                  return (
                    <ReservationDetailEdit
                      reservationId={match.params.reservation_id}
                      onCancel={onCancel}
                    />
                  );
                }}
              />
              {/* RSVP table assignment */}
              <Route
                path={`${match.url}/reservation/:reservation_id/assign_table`}
                render={({match, history}) => {
                  const onClose = () => history.push(`${baseUrl}/upcoming`);

                  return (
                    <ReservationTableAssign
                      reservationId={match.params.reservation_id}
                      onClose={onClose}
                    />
                  );
                }}
              />
              {/* Table details */}
              <Route
                path={`${match.url}/table/:table_id`}
                render={({match, history}) => {
                  const onClose = () => history.push(`${baseUrl}/upcoming`);

                  return (
                    <TableDetail
                      tableId={match.params.table_id}
                      onClose={onClose}
                    />
                  );
                }}
              />
            </Switch>
          </Card>
        )}
        main={() => (
          <Card size="md" cardDark={true} heightFull={true}>
            <Switch>
              <Route
                path={`${match.url}`}
                component={FloorPlanView}
              />
            </Switch>
          </Card>
        )}
      />
    );
  }
}

export default RsvpListIndex;
