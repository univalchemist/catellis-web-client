import React from 'react';
import { compose } from 'react-apollo';
import { Form } from 'react-final-form';

import getCurrentRestaurantQueryWrapper from 'restmgmt/rest-settings/api.getCurrentRestaurant.query';
import editRestaurantMutationWrapper from 'restmgmt/rest-settings/api.editRestaurant.mutation';
import { CardSection } from 'shared/card';
import { GridCol, GridRow } from 'shared/layout/grid';
import { NameField } from 'shared/form/fields';
// import { CardHeaderNavToggle } from 'shared/card';
import { ToggleField2 } from 'shared/form/fields';
import SubmitCancelControls from 'shared/form/SubmitCancelControls';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import { toastSuccess, toastError } from 'shared/toast';
import TimeZoneField from './TimeZoneField';
import TimeOfDayField from './TimeOfDayField';

class RestaurantSettings extends React.Component {

  render() {
    const {restaurant: {loading: isRestaurantLoading, getCurrentRestaurant: restaurant}} = this.props;
    const {onRequestUpdate} = this.props;

    const isLoading = false;

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
          render={({handleSubmit, pristine, invalid, form, errors}) => (
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
                  <TimeZoneField />
                </GridCol>
              </GridRow>
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
              <GridRow>
                <GridCol l={6}>
                  <ToggleField2
                    label="Online Open"
                    fieldName="online"
                  />
                </GridCol>
              </GridRow>
              <GridRow>
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
