import React from 'react';
import { compose } from 'react-apollo';
import { Form } from 'react-final-form';

import getCurrentRestaurantQueryWrapper from 'restmgmt/rest-settings/api.getCurrentRestaurant.query';
import editRestaurantMutationWrapper from 'restmgmt/rest-settings/api.editRestaurant.mutation';
import { CardSection } from 'shared/card';
import { GridCol, GridRow } from 'shared/layout/grid';
import { NameField, MinPartySizeField, MaxPartySizeField, OnlineDaysInAdvanceField, PhoneField, LocationField, KitchenPacingField } from 'shared/form/fields';
import SubmitCancelControls from 'shared/form/SubmitCancelControls';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import { toastSuccess, toastError } from 'shared/toast';
import TimeZoneField from './TimeZoneField';
import TimeOfDayField from './TimeOfDayField';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

class RestaurantSettings extends React.Component {
  render() {
    const {restaurant: {loading: isRestaurantLoading, getCurrentRestaurant: restaurant}} = this.props;
    const {onRequestUpdate} = this.props;

    const isLoading = false;

    const ToggleField = ({
      label,
      labelRequired
    }) => {
      if (restaurant && restaurant.online === true) {
        return (
          <Field
            name="online"
          >
          {({ input, meta }) => {
            const isError = meta.error && meta.touched;
              return (
                <Frag>
                  <Label required={labelRequired}>{label}</Label>
                  <select
                    {...input}
                    className={isError ? 'input--error' : ''}
                  >
                    <option>Online Reservations are On</option>
                    <option>Turn Off Online Reservations</option>
                  </select>
                  <FormError meta={meta} />
                </Frag>
              );
            }}
          </Field>
        );
      } else {
        return (
          <Field
            name="online"
          >
          {({ input, meta }) => {
            const isError = meta.error && meta.touched;
              return (
                <Frag>
                  <Label required={labelRequired}>{label}</Label>
                  <select
                    {...input}
                    className={isError ? 'input--error' : ''}
                  >
                    <option>Online Reservations are Off</option>
                    <option>Turn On Online Reservations</option>
                  </select>
                  <FormError meta={meta} />
                </Frag>
              );
            }}
          </Field>
        );
    }
  };

    let cardContent;
    if (isRestaurantLoading) {
      cardContent = (
        <LoadingIndicator />
      );
    } else {
      cardContent = (
        <Form
          onSubmit={onRequestUpdate}
          initialValues={restaurant}
          render={({values, handleSubmit, pristine, invalid, form, errors}) => (
            <form
              className="rest-page__section__body-form"
              onSubmit={(event) => handleSubmit(event).then(() => form.reset())}
            >
              <GridRow>
                <GridCol l={6}>
                  <NameField
                    label="Restaurant Name"
                    placeholder="Restaurant Name"
                  />
                </GridCol>
                <GridCol l={6}>
                  <LocationField />
                </GridCol>
              </GridRow>
              <GridRow>
                <GridCol l={6}>
                  <PhoneField
                    label="Restaurant Contact Phone Number"
                    />
                </GridCol>
                <GridCol l={6}>
                  <TimeZoneField />
                </GridCol>
                <GridRow>
                <GridCol l={6}>
                  <TimeOfDayField
                    label="Opening Time"
                    fieldName="rest_open_at"
                  />
                </GridCol>
                <GridCol l={6}>
                  <TimeOfDayField
                    label="Closing Time"
                    fieldName="rest_close_at"
                  />
                </GridCol>
                </GridRow>
              </GridRow>
              <GridRow>
                <GridCol l={6}>
                  <ToggleField
                    label="Online Reservation Status"
                    fieldName="online"
                  />
                </GridCol>
                <GridCol l={3}>
                  <MinPartySizeField />
                </GridCol>
                <GridCol l={3}>
                  <MaxPartySizeField />
                </GridCol>
              </GridRow>
              <GridRow>
                <GridCol l={6}>
                  <OnlineDaysInAdvanceField />
                </GridCol>
                <GridCol l={3}>
                  <KitchenPacingField />
                </GridCol>
                <GridCol>
                  <SubmitCancelControls
                    submitText="Save Updates"
                    loadingText="Updating"
                    isSubmitEnabled={!pristine && !invalid}
                    isLoading={isLoading}
                    onCancel={() => form.reset()}
                  />
                </GridCol>
              </GridRow>
            </form>
          )}
        />
      );
    }

    return (
      <CardSection
        title="General Information"
        intro={() => `Keep this information up to date so your customers get the best experience.`}
      >
        {cardContent}
      </CardSection>
    );
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
          if (formValues.online === "Turn Off Online Reservations") {
            formValues.online = false
          } else {
            formValues.online = true
          }

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
)(RestaurantSettings);
