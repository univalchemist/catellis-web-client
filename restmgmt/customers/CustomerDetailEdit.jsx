import * as React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Form } from 'react-final-form';

import CustomerDeleteButton from 'restmgmt/customers/CustomerDeleteButton';
import { Card } from 'shared/card/Card';
import { FadeInAnimation } from 'shared/animations';
import { GridCol, GridRow } from 'shared/layout/grid';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import getCustomerQueryWrapper from 'restmgmt/customers/api.getCustomer.query';
import editCustomerMutationWrapper from 'restmgmt/customers/api.editCustomer.mutation';
import { NameField, PhoneField, EmailField, TagsField } from 'shared/form/fields';
import { toastSuccess, toastError } from 'shared/toast';
import CustomerChip from 'shared/customer/CustomerChip';
import SubmitCancelControls from 'shared/form/SubmitCancelControls';

const CustomerDetailEditView = ({customer, onUpdate}) => {
  const isLoading = false;

  return (
    <Card size="md" cardOverflow={true}>
      <FadeInAnimation>
        <header className="rest-page__section__header">
          <GridRow>
            <GridCol m={6} l={8}>
              <CustomerChip
                customer={customer}
                showEmail={true}
              />
            </GridCol>
            <GridCol s={0} m={3} l={4}>
              <div className="rest-page__section__header-action">
                <CustomerDeleteButton
                  customer={customer}
                />
              </div>
            </GridCol>
          </GridRow>
        </header>
        <div className="rest-page__section__body">
          <h6>Update Customer's Information</h6>
          <Form
            onSubmit={onUpdate}
            initialValues={customer}
            render={({handleSubmit, pristine, invalid, form}) => (
              <form
                className="rest-page__section__body-form"
                onSubmit={(event) => handleSubmit(event).then(() => form.reset())}
              >
                <div>
                  <NameField labelRequired={true} />
                </div>
                <GridRow>
                  <GridCol m={4} l={6}>
                    <PhoneField labelRequired={true} />
                  </GridCol>
                  <GridCol m={5} l={6}>
                    <EmailField />
                  </GridCol>
                  <GridCol m={5} l={6}>
                    <TagsField />
                  </GridCol>
                </GridRow>
                <SubmitCancelControls
                  submitText="Update Customer"
                  loadingText="Updating Customer"
                  isSubmitEnabled={!pristine && !invalid}
                  isLoading={isLoading}
                  onCancel={() => form.reset()}
                />
              </form>
            )}
          />
        </div>
      </FadeInAnimation>
    </Card>
  );
};

const CustomerDetailEdit = ({
  get: {loading = false, getCustomer: customer},
  history,
  match: { params },
  onRequestUpdate
}) => {
  if (loading || !customer) {
    return (
      <LoadingIndicator />
    );
  }

  return (
    <CustomerDetailEditView
      customer={customer}
      onUpdate={onRequestUpdate}
    />
  );
};


export default compose(
  withRouter,
  getCustomerQueryWrapper(
    'get',
    {
      options: (props) => ({
        variables: {
          id: props.match.params.id
        }
      })
    }
  ),
  editCustomerMutationWrapper(
    'update',
    {
      props: ({update, ownProps: { match }}) => ({
        onRequestUpdate: (formValues) => {
          const updateQ = update({
            variables: {
              id: match.params.id,
              ...formValues
            }
          });

          updateQ
            .then(() => {
              toastSuccess(`Success! The customer has been updated.`);
            })
            .catch(() => {
              toastError();
            })

          return updateQ;
        }
      })
    }
  ),
)(CustomerDetailEdit);
