import * as React from 'react';
import { Form } from 'react-final-form';

import StackedSubmitCancelControls from 'shared/form/StackedSubmitCancelControls';
import format from 'shared/formatters/phone-number';
import { EmailField } from 'shared/form/fields';
import CustomerChip from 'shared/customer/CustomerChip';

export const CustomerConfirmation = ({
  reservationValues,
  suggestedCustomers,
  onSubmitExistingCustomer,
  onSubmitNewCustomer,
  onCancel
}) => {

  let confirmCustomer;

  if (suggestedCustomers.length === 0) {
    // No suggested customers.
    confirmCustomer = (
      <p>
        The name <b>{reservationValues.name}</b> and phone number <b>{format(reservationValues.phone_number)}</b> did not match any existing customers.
      </p>
    );
  } else {
    // Suggested customers, so show them.
    confirmCustomer = (
      <React.Fragment>
        <p>
          The name <b>{reservationValues.name}</b> and phone number <b>{format(reservationValues.phone_number)}</b> matched {suggestedCustomers.length === 1 ? 'an existing customer' : 'existing customers'}. Select the customer or create a new one.
        </p>
        <ul className="chip__list">
        {suggestedCustomers.map(customer => (
          <li
            className="chip__list__item clickable"
            key={customer.id}
            onClick={() => onSubmitExistingCustomer(customer.id)}
          >
            <CustomerChip customer={customer} />
          </li>
        ))}
        </ul>
      </React.Fragment>
    );
  }

  return (
    <div>
      <header
        className="rest-page__aside__header"
      aria-label="confirm-customer-account">
        <h4>Confirm Customer</h4>
      </header>
      <div className="rest-page__aside__form rest-page__aside__body card__overflow-container--footer">
        <Form
          onSubmit={({email}) => onSubmitNewCustomer(email)}
          render={({handleSubmit, pristine, invalid, errors}) => (
            <form
              onSubmit={handleSubmit}
              >
                <fieldset className="margin-bottom--32">
                  {confirmCustomer}
                </fieldset>
                <fieldset>
                  <h4>Create Customer</h4>
                  <EmailField />
                </fieldset>
                <StackedSubmitCancelControls
                  submitText="Create New Customer"
                  loadingText="Creating Customer and RSVP"
                  isSubmitEnabled={!invalid}
                  isLoading={false}
                  cancelText="Back"
                  onCancel={onCancel}
                />
              </form>
            )}
          />
      </div>
    </div>
  );
};

export default CustomerConfirmation;
