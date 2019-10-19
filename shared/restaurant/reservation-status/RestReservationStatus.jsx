import * as React from 'react';

import MaterialIcon from 'material-icons-react';

import styles from 'stylesheets/settings/variables/_colors.scss'

const statusMap = {
  'not_confirmed': {
    icon: 'radio_button_unchecked',
    color: styles.yellowBase
  },
  'confirmed': {
    icon: 'check_circle',
    color: styles.greenBase
  },
  'left_message': {
    icon: 'voicemail',
    color: styles.orangeBase
  },
  'no_answer': {
    icon: 'phone_missed',
    color: styles.orangeBase
  },
  'wrong_number': {
    icon: 'ring_volume',
    color: styles.orangeBase
  },
  'canceled_guest': {
    icon: 'event_busy',
    color: styles.redBase
  },
  'canceled_restaurant': {
    icon: 'event_busy',
    color: styles.redBase
  },
  'waitlist': {
    icon: 'event_note',
    color: styles.purpleBase
  },
  'seated': {
    icon: 'event_seat',
    color: styles.pinkBase
  },
  'complete': {
    icon: 'event_available',
    color: styles.greenBase
  }
}

export const RestReservationStatus = ({
  restRSVPStatus,
  iconColorOverride,
  textSizeOverride = '13px'
}: RestReservationStatusProps) => {

  const activatedStatus = statusMap[restRSVPStatus];

  const iconColor = iconColorOverride != null
    ? iconColorOverride
    : activatedStatus.color;

  return (
    <MaterialIcon
      icon={activatedStatus.icon}
      color={iconColor}
      size={textSizeOverride}
    />
  );
};
