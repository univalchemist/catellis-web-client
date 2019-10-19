import React, { Fragment } from 'react';

import RestHeader from 'shared/restaurant/header/RestHeader';
import { Button } from 'shared/buttons';
import MaterialIcon from 'material-icons-react';
import ModalAnimation from 'shared/modal/ModalAnimation'
import ShiftNotesModalForm from 'restmgmt/rsvplist/ShiftNotesModalForm';
import Clock from 'restmgmt/shared/Clock';
import DateTabber from 'restmgmt/shared/DateTabber';
import SetActiveDateMutation from 'restmgmt/shared/SetActiveDateMutation';

class ReservationsHeader extends React.Component {
  state = {
    isNotesModalVisible: false
  };

  render() {
    const {isNotesModalVisible} = this.state;

    return (
      <Fragment>
        <RestHeader
          label={() => (<Clock />)}
          title={() => (<DateTabber />)}
          actionsList={[
            (
              <SetActiveDateMutation>
                {({mutation: setActiveDate}) => (
                  <Button
                    buttonStyle="menu-dark"
                    size="md"
                    onClick={() => setActiveDate()}
                  >
                    <MaterialIcon icon="event" invert />
                  </Button>
                )}
              </SetActiveDateMutation>
            ),
            (
              <Button
                buttonStyle="menu-dark"
                size="md"
                onClick={() => this.setState({isNotesModalVisible: true})}
              >
                <MaterialIcon icon="assignment" invert />
              </Button>
            ),
          ]}
        />
        <ModalAnimation>
          {(isNotesModalVisible &&
            <ShiftNotesModalForm
              onClose={() => this.setState({isNotesModalVisible: false})}
            />
          )}
        </ModalAnimation>
      </Fragment>
    );
  }
}

export default ReservationsHeader;
