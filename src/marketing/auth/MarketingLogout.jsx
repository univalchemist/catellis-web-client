import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import { withRouter, Link } from 'react-router-dom';
import { withApollo, compose } from 'react-apollo';

import {
  GridCol,
  GridRow
} from 'shared/layout/grid';
import LoadingIndicator from 'shared/loading-indicator';
import { Card } from 'shared/card/Card';
import localLogOutUserMutationWrapper from 'shared/auth/local.logOutUser.mutation';

const logo = require("assets/images/logos/logo.svg");

class MarketingLogout extends Component {
  componentDidMount() {
    const {props: {client, logOutUser, history}} = this;

    logOutUser()
      .then(() => {
        // FIXME: this is awkward, really logOutUser()
        // should handle resetting the store.
        return client.resetStore();
      })
      .then(() => {
        history.push('/login');
      })
  }

  render() {
    return (
      <div className="container">
        <GridRow>
          <GridCol className="text--center margin-bottom--32">
            <Link to="/">
              <SVG src={logo} alt="Yosowitz" />
            </Link>
          </GridCol>
        </GridRow>
        <GridRow>
          <GridCol s={4} m={5} l={4} mOffset={2} lOffset={4}>
            <Card size="sm">
              <h4>Logging Out</h4>
              <LoadingIndicator />
            </Card>
          </GridCol>
        </GridRow>
      </div>
    );
  }
}

export default compose(
  withApollo,
  withRouter,
  localLogOutUserMutationWrapper()
)(MarketingLogout);
