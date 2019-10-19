import * as React from 'react';
import { Form } from 'react-final-form';
import { Fragment as Frag } from 'react';
import * as moment from 'moment-timezone';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import MaterialIcon from 'material-icons-react';
import styles from 'stylesheets/settings/variables/_colors.scss';
import swal from 'sweetalert';
import { FadeInAnimation } from 'shared/animations';
import StackedSubmitCancelControls from 'shared/form/StackedSubmitCancelControls';
import ReservationFormSegment from 'restmgmt/rsvplist/ReservationFormSegment';
import formValueFormatter from 'restmgmt/rsvplist/reservation-form-value-formatter';
import { NameField, PhoneField } from 'shared/form/fields';

export class ReservationForm extends React.Component {
  state = {
    start_time: moment().format("YYYY-MM-DD") + "T07:00:00.000Z",
    end_time: moment().add(1, 'd').format("YYYY-MM-DD") + "T06:59:59.999Z",
    currentShiftNotes: ""
  }

  showShiftNotes = () => {
    swal("Reservation's Date Shift Notes", this.state.currentShiftNotes, "info", {
    button: "Dismiss",
    });
  }

  onChange = (value) => {
    this.state.start_time = moment(value.value).format("YYYY-MM-DD") + "T07:00:00.000Z"
    this.state.end_time = moment(value.value).add(1, 'd').format("YYYY-MM-DD") + "T06:59:59.999Z"
  }

  onSubmit = (formValues) => {
    const formattedFormValues = formValueFormatter(
      formValues,
      this.props.restaurant.timezone_name
    );

    return this.props.onSubmit(formattedFormValues);
  }

  render() {
    const {
      reservationValues,
      onCancel,
      restaurant
    } = this.props;

    const formValues = {
      name: reservationValues.name,
      phone_number: reservationValues.phone_number,
      reservationDate: moment(reservationValues.scheduled_start_at).format('dddd, MMMM D, YYYY'),
      party_size: reservationValues.party_size,
      reservationTime: moment(reservationValues.scheduled_start_at).format('h:mm a'),
      reservation_status: reservationValues.reservation_status,
      party_notes: reservationValues.party_notes,
      employee: reservationValues.employee,
      tags: reservationValues.tags
    };

    const ShiftNotes = () => (
      <Query
        query={gql`
          {
            getCurrentShiftNote(shift_start_at: "${this.state.start_time}", shift_end_at: "${this.state.end_time}") {
            	note
            }
          }
        `}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          if (data.getCurrentShiftNote){
            this.state.currentShiftNotes = data.getCurrentShiftNote.note
            return (
              <div onClick={() => {this.showShiftNotes()}}>
                <MaterialIcon icon="event_note" size={30} color={styles.blueBase}/>
              </div>
            )
          }else{
            return <small></small>
          }
        }}
      </Query>
    );

    return (
      <Frag>
        <header
          className="rest-page__aside__header"
        aria-label="create-reservation">
          <h4>Create Reservation</h4>
        </header>
        <FadeInAnimation>
          <div className="rest-page__aside__form rest-page__aside__body card__overflow-container--footer">
            <Form
              onSubmit={this.onSubmit}
              initialValues={formValues}
              render={({handleSubmit, pristine, invalid, errors}) => (
                <form
                  className="rest-page__aside__form"
                  onSubmit={handleSubmit}
                >
                  <fieldset>
                    <NameField labelRequired={true} />
                    <PhoneField labelRequired={true} />
                  </fieldset>
                  <fieldset>
                    <ReservationFormSegment restaurant={restaurant} onChange={this.onChange}/>
                    <div>
                      <ShiftNotes />
                    </div>
                  </fieldset>
                  <StackedSubmitCancelControls
                    submitText="Create"
                    loadingText="Creating"
                    isSubmitEnabled={!invalid}
                    isLoading={false}
                    onCancel={onCancel}
                  />
                </form>
              )}
            />
          </div>
        </FadeInAnimation>
      </Frag>
    );
  }
}

export default ReservationForm;
