import * as React from 'react';
import { compose } from 'react-apollo';
import { toastSuccess, toastError } from 'shared/toast';
import { CardSection } from 'shared/card';
import ToggleSwitch from 'shared/buttons/ToggleSwitch'
import swal from 'sweetalert';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';
import { FormError } from 'shared/form/FormError';
import { GridCol } from 'shared/layout/grid';
import { Form } from 'react-final-form';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import { NotificationsEmailField, ReservationConfirmationNotesField, CheckboxField } from 'shared/form/fields';
import SubmitCancelControls from 'shared/form/SubmitCancelControls';
import getCurrentRestaurantQueryWrapper from 'restmgmt/rest-settings/api.getCurrentRestaurant.query';
import editRestaurantMutationWrapper from 'restmgmt/rest-settings/api.editRestaurant.mutation';

function showInfo(info_field){
  let title = ''
  let info = ''
  if(info_field === "confirm"){
    title = "Confirm Email"
    info = "This is additional information about confirm email field"
  }

  if(info_field === "reminders"){
    title = "Email Reminders"
    info = "This is additional information about the email reminders field"
  }

  if(info_field === "notes"){
    title = "Email Confirmation Notes"
    info = "This is additional information about the email confirmation notes field"
  }
  swal(title, info, "info", {
  button: "Dismiss",
  });
}

function showConfirmNotes(values){
  if(values.email_confirmation_inhouse === true){
    return(
      <ReservationConfirmationNotesField
        label="Reservation Confirmation notes:"
        placeholder="Edit what your email confirmation will say."
        fieldName="email_confirmation_notes"
      />
    )
  }
}

function reservationTime(values){
  if(values.email_reminders === true){
    return(
      <Field
        name="email_reminder_time"
      >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;
          return (
            <Frag>
            <label>Time before reservation to send email:</label>
              <select
                {...input}
                className={isError ? 'input--error' : ''}
              >
                <option>1 Hour</option>
                <option>2 Hours</option>
                <option>6 Hours</option>
                <option>1 Day</option>
              </select>
              <FormError meta={meta} />
            </Frag>
          );
        }}
      </Field>
    )
  }
}

class NotificationsSection extends React.Component {
  changeSwitch = (bool, values, fieldName) => {
    values.fieldName = bool
  }

  changeBox = (values, fieldName) => {
    values.fieldName === true ? values.fieldName = false : values.fieldName = true
  }
  render() {
    const {restaurant: {loading: isRestaurantLoading, getCurrentRestaurant: restaurant}} = this.props;
    const {onRequestUpdate} = this.props;
    const isLoading = false;

    let cardContent;

    if (isRestaurantLoading) {
      return(
        cardContent = (
          <LoadingIndicator />
        )
      );
    } else {
      return (
        <div>
        <Form
          onSubmit={onRequestUpdate}
          initialValues={restaurant}
          render={({handleSubmit, pristine, invalid, form, errors, values}) => (
            <form
              className="rest-page__section__body-form"
              onSubmit={(event) => handleSubmit(event).then(() => form.reset())}
            >
              <GridCol l={6}>
              <CardSection
                title="Guest Notifications"
                intro={() => `Manage reservation notifications for your guests.`}
              >
                {cardContent}
              </CardSection>
              </GridCol>
              <GridCol l={10}>
              <Field
                name="email_confirmation_inhouse"
                type="checkbox"
              >
              {({ input, meta }) => {
                return (
                  <Frag>
                    <label>
                      <ToggleSwitch
                        fieldName={"email_confirmation_inhouse"}
                        checked={values.email_confirmation_inhouse}
                        onChange={this.changeSwitch}
                        passed_values={values}
                        {...input}
                      />
                    </label>
                  </Frag>
                )}
              }
              </Field> Send confirmation emails to guests for in-house reservations <small style={{ color: 'blue' }} onClick={() => {showInfo("confirm")}}>info?</small>
                {showConfirmNotes(values)}
              </GridCol>
            <GridCol l={6}>
            <Field
              name="email_reminders"
            >
            {({ input, meta }) => {
              return (
                <Frag>
                  <label>
                  <ToggleSwitch
                    fieldName={"email_reminders"}
                    checked={values.email_reminders}
                    onChange={this.changeSwitch}
                    passed_values={values}
                    {...input}
                  />
                  </label>
                </Frag>
              )}
            }
            </Field> Send email reminders to guests prior to their reservations <small style={{ color: 'blue' }} onClick={() => {showInfo("reminders")}}>info?</small>
            </GridCol>
            <GridCol l={10}>
            {reservationTime(values)}
            </GridCol>
            <GridCol l={6}>
            <CardSection
              title="Restaurant Notifications"
              intro={() => `Allow notifications when a reservation is created, edited or cancelled.`}
            >
              {cardContent}
            </CardSection>
            </GridCol>
            <GridCol l={6}>
            <CheckboxField
              fieldName={"created_notification"}
              label={"Created"}
              onChange={() => {this.changeBox(values, "created_notification")}}
            /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <CheckboxField
              fieldName={"edited_notification"}
              label={"Edited"}
              onChange={() => {this.changeBox(values, "edited_notification")}}
            /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <CheckboxField
              fieldName={"cancelled_notification"}
              label={"Cancelled"}
              onChange={() => {this.changeBox(values, "cancelled_notification")}}
            /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </GridCol>
            <GridCol l={8}>
            <NotificationsEmailField
              label="Email Address for Notifications:"
              placeholder="Email for resturant notifications"
              fieldName="notification_email_address"
            />
            </GridCol>
            <SubmitCancelControls
              submitText="Save Updates"
              loadingText="Updating"
              isSubmitEnabled={!pristine && !invalid}
              isLoading={isLoading}
              onCancel={() => form.reset()}
            />
            </form>
          )}
          />
        </div>
      );
  }
}
}
export default compose(
  getCurrentRestaurantQueryWrapper(
    'restaurant',
  ),
  editRestaurantMutationWrapper(
    'update',
    {
      props: ({update, ownProps}) => ({
        onRequestUpdate: (formValues) => {
          const {restaurant: {getCurrentRestaurant: restaurant}} = ownProps;
          // TODO reformat code so that a string is not needed for the on/off button

          const updateQ = update({
            variables: {
              id: restaurant.id,
              ...formValues
            }
          });

          updateQ
            .then(() => {
              toastSuccess(`Success! The restaurant settings have been updated.`);
            })
            .catch(() => {
              toastError();
            })

          return updateQ;
        }
      })
    }
  ),
)(NotificationsSection);
