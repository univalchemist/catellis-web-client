import * as React from 'react';
import SVG from 'react-inlinesvg';

import Login from 'shared/auth/Login';
import {
  GridCol,
  GridRow
} from 'shared/layout/grid';
import { Card } from 'shared/card/Card';
import { Link } from 'react-router-dom';

const logo = require("assets/images/logos/logo.svg");

const MarketingLogin = () => {
  return (
    <div className="container">
      <GridRow>
        <GridCol className="text--center margin-bottom--32">
          <Link to="/">
            <SVG src={logo} alt="Catellis" />
          </Link>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol s={4} m={5} l={4} mOffset={2} lOffset={4}>
          <Card size="sm">
            <Login />
          </Card>
        </GridCol>
      </GridRow>
    </div>
  );
};

export default MarketingLogin;
