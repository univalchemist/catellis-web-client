import * as React from 'react';
import { compose } from 'react-apollo';
import { toastSuccess, toastError } from 'shared/toast';
import { GridCol, GridRow } from 'shared/layout/grid';
import { CardSection } from 'shared/card';
import { Card } from 'shared/card';
import styles from 'stylesheets/settings/variables/_colors.scss';
import TimeInput from 'react-time-input';
import { Form } from 'react-final-form';
import { TurnTimeField } from 'shared/form/fields';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import SubmitCancelControls from 'shared/form/SubmitCancelControls';
import getCurrentRestaurantQueryWrapper from 'restmgmt/rest-settings/api.getCurrentRestaurant.query';
import editRestaurantMutationWrapper from 'restmgmt/rest-settings/api.editRestaurant.mutation';

class TurnTimeSection extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  formatTime = (time) => {
    var hour = Math.floor(Math.abs(time));
    var min = Math.floor((Math.abs(time) * 60) % 60);
    return hour + ":" + (min < 10 ? "0" : "") + min;
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
    }else {
      return (
        <div>
        <div>
        <Form
          onSubmit={onRequestUpdate}
          initialValues={restaurant}
          render={({handleSubmit, pristine, invalid, form, errors, values}) => (
            <form
              className="rest-page__section__body-form"
              onSubmit={(event) => handleSubmit(event).then(() => form.reset())}
            >
            <GridRow>
            <GridCol l={6}>
            <CardSection
              title="Turn Time Settings"
              intro={() => `Adjust the time a reservation will occupy tables based on the number of guests.`}
            >
            </CardSection>
            </GridCol>
            </GridRow>
            <div style={{ marginLeft : 200 }}>
            <GridRow>
              <GridCol l={9}>
                <Card size="md">
                <table className="table">
                  <thead className="table__header">
                      <tr className="table__row">
                        <th width="80%">Party Size</th>
                        <th width="20%">Expected Time (H:MM)</th>
                      </tr>
                  </thead>
                  <tbody className="table__body">
                    {[...Array(20)].map((e, i) => {
                      {i = i+1}
                      return (
                        <tr key={i} className="table__row">
                          <th>{i > 1 ? i + " Guests" : i + " Guest"}</th>
                          <td colSpan="6">
                            <TurnTimeField fieldNum={i} />
                            {this.formatTime(values[`turn_time_${i}`])}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                </Card>
              </GridCol>
            </GridRow>
            </div>
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
)(TurnTimeSection);
