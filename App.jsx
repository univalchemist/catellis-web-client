import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import './app.scss';
import AppRoute from 'shared/layout/AppRoute';
import Home from 'marketing/Home';
import MarketingLogin from 'marketing/auth/MarketingLogin';
import MarketingLogout from 'marketing/auth/MarketingLogout';
import MarketingAuthLayout from 'shared/layout/MarketingAuthLayout';
import MarketingLayout from 'shared/layout/MarketingLayout';
import ProtectedRoute from 'shared/auth/ProtectedRoute';
import RestaurantMgmtBodyWrapper from 'shared/layout/RestaurantMgmtBodyWrapper';
import RestaurantMgmt from 'restmgmt/RestaurantMgmt';
import { ToastContainer, toast } from 'react-toastify';

class App extends React.Component {
  render() {
    return (
      <Router>
        <main role="main">
          <ToastContainer
            position={toast.POSITION.TOP_CENTER}
          />
          <Switch>
            <AppRoute
              path="/"
              exact={true}
              layout={MarketingLayout}
              component={Home}
            />
            <AppRoute
              path="/login"
              layout={MarketingAuthLayout}
              component={MarketingLogin}
            />
            <AppRoute
              path="/logout"
              layout={MarketingAuthLayout}
              component={MarketingLogout}
            />
            <ProtectedRoute
              layout={RestaurantMgmtBodyWrapper}
              path="/rm"
              component={RestaurantMgmt}
            />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
