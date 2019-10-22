import * as React from 'react';
import { compose } from 'react-apollo';
import { Form, Field } from 'react-final-form';
import * as moment from 'moment';

import StackedSubmitCancelControls from 'shared/form/StackedSubmitCancelControls';
import Modal from 'shared/modal/modal';
import { toastSuccess, toastError } from 'shared/toast';
import getActiveDateWrapper from 'restmgmt/store/operations/local.getActiveDate.query';
import {
  queryWrapper as getCurrentShiftNoteWrapper,
  opName as getCurrentShiftNoteOpName
} from 'restmgmt/rsvplist/api.getCurrentShiftNote.query';
import editShiftNoteWrapper from 'restmgmt/rsvplist/api.editShiftNote.mutation';
import createShiftNoteWrapper from 'restmgmt/rsvplist/api.createShiftNote.mutation';

class ShiftNotesModalForm extends React.Component {
  onSubmitForm = (formValues) => {
    const {getShiftNote: {getCurrentShiftNote: shiftNote}} = this.props;

    const handler = shiftNote && shiftNote.id
      ? this.props.onRequestUpdate
      : this.props.onRequestCreate;

    return handler(formValues);
  }

  render() {
    const {
      onClose,
      getActiveDate: {restMgmtState: {activeDate}},
      getShiftNote: {getCurrentShiftNote: shiftNote}
    } = this.props;

    const initialValues = {
      note: shiftNote ? shiftNote.note : null
    };

    return (
      <Modal
        title={`Shift Notes: ${moment(activeDate).format('dddd, MMM. D')}`}
        onClose={onClose}
        body={({onClose}) => (
          <Form
            onSubmit={(formValues) => this.onSubmitForm(formValues)}
            initialValues={initialValues}
            render={({handleSubmit, pristine, invalid}) => (
              <form
                className="rest-page__section__body-form"
                onSubmit={(event) => {
                  handleSubmit(event).then(onClose)
                }}
              >
                <div>
                  <label>Notes</label>
                  <Field
                    name="note"
                    component="textarea"
                  />
                </div>
                <StackedSubmitCancelControls
                  submitText="Update"
                  loadingText="Updating"
                  isSubmitEnabled={!pristine && !invalid}
                  isLoading={false}
                  onCancel={onClose}
                />
              </form>
            )}
          />
        )}
      />
    );
  }
}

export default compose(
  getActiveDateWrapper('getActiveDate'),
  getCurrentShiftNoteWrapper(
    'getShiftNote',
    {
      options: ({getActiveDate: {restMgmtState: {activeDate}}}) => {
        const activeDateMoment = moment(activeDate);

        return {
          variables: {
            shift_start_at: activeDateMoment.startOf('day').toISOString(),
            shift_end_at: activeDateMoment.endOf('day').toISOString()
          }
        };
      }
    }
  ),
  editShiftNoteWrapper(
    'update',
    {
      props: ({
        update,
        ownProps: {getShiftNote: {getCurrentShiftNote: shiftNote}}
      }) => ({
        onRequestUpdate: (formValues) => {
          const updateQ = update({
            variables: {
              id: shiftNote.id,
              note: formValues.note
            }
          });

          updateQ
            .then(() => {
              toastSuccess(`Success! The shift note has been updated.`);
            })
            .catch(() => {
              toastError();
            })

          return updateQ;
        }
      })
    }
  ),
  createShiftNoteWrapper(
    'create',
    {
      props: ({
        create,
        ownProps: {getActiveDate: {restMgmtState: {activeDate}}}
      }) => ({
        onRequestCreate: (formValues) => {
          const shiftDateMoment = moment(activeDate).startOf('day').add(12, 'hours');

          const createQ = create({
            variables: {
              note: formValues.note,
              shift_start_at: shiftDateMoment.toISOString()
            }
          });

          createQ
            .then(() => {
              toastSuccess(`Success! The shift note has been updated.`);
            })
            .catch(() => {
              toastError();
            })

          return createQ;
        }
      }),
      options: {
        refetchQueries: [getCurrentShiftNoteOpName]
      }
    }
  ),
)(ShiftNotesModalForm);
