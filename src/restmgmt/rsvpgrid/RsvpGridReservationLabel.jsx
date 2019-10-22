import * as React from 'react';

import { Chip } from 'shared/chip/Chip';
import { ChipTextContainer } from 'shared/chip/ChipTextContainer';
import { ChipTitle } from 'shared/chip/ChipTitle';
import { ChipDescription } from 'shared/chip/ChipDescription';
import { GridCol, GridRow } from 'shared/layout/grid';

import styles from 'stylesheets/settings/variables/_colors.scss'

import { RestReservationStatus } from 'shared/restaurant/reservation-status/RestReservationStatus';

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

export const RestReservationStatusLabel = ({
  restRSVPStatus,
  children
}: RestReservationStatusLabelProps) => {

  const activatedStatus  = statusMap[restRSVPStatus];

  return (
    <div className="rest-page__grid__reservation__label"
      style={{backgroundColor: activatedStatus.color}}>
      {children}
    </div>
  );
};

const RsvpGridReservationLabel = ({reservation}) =>  {

    return (
      <RestReservationStatusLabel
        restRSVPStatus={reservation.reservation_status}>
        <GridRow>
          <GridCol s={3} m={7} l={9}>
            <Chip size="lg">
              <ChipTextContainer>
                <ChipTitle text={reservation.customer.name} invert="true"/>
                <ChipDescription invert="true">
                  {reservation.party_size} Guests
                </ChipDescription>
              </ChipTextContainer>
            </Chip>
          </GridCol>
          <GridCol s={1} m={2} l={3}>
            <div className="rest-page__grid__reservation__status">
              <RestReservationStatus
                restRSVPStatus={reservation.reservation_status}
                iconColorOverride={styles.whiteBase}
                textSizeOverride="24px"
              />
            </div>
          </GridCol>
        </GridRow>
      </RestReservationStatusLabel>
    );
}

export default RsvpGridReservationLabel;
