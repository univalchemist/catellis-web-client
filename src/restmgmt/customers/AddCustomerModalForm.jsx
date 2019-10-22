import * as React from 'react';
import { Fragment as Frag } from 'react';
import { compose } from 'react-apollo';
import { Form } from 'react-final-form';

import StackedSubmitCancelControls from 'shared/form/StackedSubmitCancelControls';
import createCustomerMutationWrapper from 'restmgmt/customers/api.createCustomer.mutation';
import Modal from 'shared/modal/modal';
import { toastSuccess, toastError } from 'shared/toast';
import { NameField, PhoneField, EmailField, TagsField } from 'shared/form/fields';
import { opName as listCustomersOpName } from 'restmgmt/customers/api.listCustomers.query';

const AddCustomerModalForm = ({onClose, onRequestCreate}) => {
  const isLoading = false;

  return (
    <Modal
      title="Create Customer"
      onClose={onClose}
      body={({onClose}) => (
        <Frag>
          <Form
            onSubmit={onRequestCreate}
            render={({handleSubmit, pristine, invalid, form}) => (
              <form
                className="rest-page__section__body-form"
                onSubmit={(event) => handleSubmit(event).then(() => form.reset())}
              >
                <div>
                  <NameField labelRequired={true} />
                </div>
                <div>
                  <PhoneField labelRequired={true} />
                </div>
                <div>
                  <EmailField />
                </div>
                <div>
                  <TagsField />
                </div>
                <StackedSubmitCancelControls
                  submitText="Add"
                  loadingText="Adding"
                  isSubmitEnabled={!pristine && !invalid}
                  isLoading={isLoading}
                  onCancel={onClose}
                />
              </form>
            )}/>
        </Frag>
      )}
    />
  );
};

export default compose(
  createCustomerMutationWrapper(
    'create',
    {
      props: ({create, ownProps: { onClose }}) => ({
        onRequestCreate: (formValues) => {
          const createQ = create({
            variables: formValues
          });

          createQ
            .then(() => {
              toastSuccess(`Success! The customer has been created.`);
            })
            .catch(() => {
              toastError();
            })
            .then(() => {
              onClose();
            })

          return createQ;
        },
      }),
      options: {
        refetchQueries: [listCustomersOpName]
      }
    }
  )
)(AddCustomerModalForm);
