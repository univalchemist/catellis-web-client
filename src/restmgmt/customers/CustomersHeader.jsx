import * as React from 'react';
import { Fragment as Frag } from 'react';
import { compose } from 'react-apollo';
import MaterialIcon from 'material-icons-react';

import AddCustomerModalForm from 'restmgmt/customers/AddCustomerModalForm';
import { Button } from 'shared/buttons';
import customersQueryWrapper from 'restmgmt/customers/api.listCustomers.query';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import ModalAnimation from 'shared/modal/ModalAnimation';
import RestHeader from 'shared/restaurant/header/RestHeader';

class CustomersHeader extends React.Component {
  state = {
    isAddModalVisible: false
  };

  render() {
    const { loading, listCustomers: customers } = this.props.customers || {loading: false, listCustomers: null};

    if (loading || !customers) {
      return (<LoadingIndicator />);
    }

    const {isAddModalVisible} = this.state;

    return (
      <Frag>
        <RestHeader
          label={() => `${customers.length} Total`}
          title={() => "Manage Customers"}
          actionsList={[
            (
              <Button
                buttonStyle="secondary"
                size="md"
                onClick={() => this.setState({isAddModalVisible: true})}
              >
                <MaterialIcon icon="add" invert />
              </Button>
            ),
          ]}
        />
        <ModalAnimation>
          {(isAddModalVisible &&
            <AddCustomerModalForm
              onClose={() => this.setState({isAddModalVisible: false})}
            />
          )}
        </ModalAnimation>
      </Frag>
    );
  }
}

export default compose(customersQueryWrapper())(CustomersHeader);
