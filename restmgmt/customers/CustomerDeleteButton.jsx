import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';

import { Button } from 'shared/buttons';
import destroyCustomerMutationWrapper from 'restmgmt/customers/api.destroyCustomer.mutation';
import { toastSuccess, toastError } from 'shared/toast';
import { opName as listCustomersOpName } from 'restmgmt/customers/api.listCustomers.query';

const CustomerDeleteButton = ({onRequestDestroy, customer}) => {
  return (
    <Button
      buttonStyle="danger"
      onClick={onRequestDestroy}
    >
      Delete Customer
    </Button>
  );
};

export default compose(
  withRouter,
  destroyCustomerMutationWrapper(
    'destroy',
    {
      props: ({destroy, ownProps: {customer, history}}) => ({
        onRequestDestroy: (formValues) => {
          const destroyQ = destroy({
            variables: {
              id: customer.id
            }
          });

          destroyQ
            .then(() => {
              toastSuccess(`Success! The customer has been deleted.`);

              history.push('/rm/customers');
            })
            .catch(() => {
              toastError();
            })

          return destroyQ;
        }
      }),
      options: {
        refetchQueries: [listCustomersOpName]
      }
    }
  ),
)(CustomerDeleteButton);
