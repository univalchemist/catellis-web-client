import * as React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import { Card } from 'shared/card/Card';
import CustomersListSidebar from 'restmgmt/customers/CustomersListSidebar';
import CustomerDetailEdit from 'restmgmt/customers/CustomerDetailEdit';
import CustomersHeader from 'restmgmt/customers/CustomersHeader';
import RestaurantMgmtLayout from 'shared/layout/RestaurantMgmtLayout';
import RestSectionBlankState from 'shared/restaurant/blank-state/RestSectionBlankState';

const BlankDetailsSection = () => {
  return (
    <Card size="md" cardOverflow={true}>
      <RestSectionBlankState
        title="Customer Details"
        description="To view a customer's details, you must first start by selecting a customer on the left"
        icon="person"
      />
    </Card>
  );
};

class CustomersIndex extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <RestaurantMgmtLayout
        header={() => (
          <CustomersHeader />
        )}
        sidebar={() => (
          <Card size="md" cardOverflow={true} cardOverflowScroll={true}>
            <CustomersListSidebar />
          </Card>
        )}
        main={() => (
          <Switch>
            <Route
              path={`${match.url}`}
              exact
              component={BlankDetailsSection}
            />
            <Route
              path={`${match.url}/:id`}
              component={CustomerDetailEdit}
            />
          </Switch>
        )}
      />
    );
  }
}

export default CustomersIndex;
