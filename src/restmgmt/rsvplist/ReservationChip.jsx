import React from 'react';
import MaterialIcon from 'material-icons-react';
import { Avatar } from 'shared/avatar/Avatar';
import { Chip } from 'shared/chip/Chip';
import { ChipTextContainer } from 'shared/chip/ChipTextContainer';
import { ChipTitle } from 'shared/chip/ChipTitle';
import { ChipDescriptionList } from 'shared/chip/ChipDescriptionList';
import { GridCol, GridRow } from 'shared/layout/grid';
import { RestReservationStatus } from 'shared/restaurant/reservation-status/RestReservationStatus';
import LocalReservationTime from 'restmgmt/rsvplist/LocalReservationTime';
import styles from 'stylesheets/settings/variables/_colors.scss';
import TableConflictIcon from 'restmgmt/rsvplist/TableConflictIcon';
import { Button } from 'shared/buttons';

function reservationNotes(note) {
  if (note && note.trim().length > 0) {
    return (
      <MaterialIcon icon="comment" size={12} color={styles.blueBase} />
    );
  }

  return null;
}

  function tagCheck(resTag, cusTag) {
      if (resTag && resTag.trim().length > 0) {
        return (
          <MaterialIcon icon="local_offer" size={12} color={styles.blueBase} />
        );
      }
      if (cusTag && cusTag.trim().length > 0) {
        return (
          <MaterialIcon icon="local_offer" size={12} color={styles.blueBase} />
        );
      }

      return null;
  }

const ReservationChip = ({reservation, btnSeat = false, onClickBtnSeat = undefined}) => {

  const isConflicted = (reservation.table_conflicted === true || reservation.isConflicted === true);

  let conflict;
  if (isConflicted === true) {
    conflict = (
      <div className="rsvp-list__item--left__status--conflict">
        <TableConflictIcon size={24}/>
      </div>
    );
  }
  return (
    <GridRow>
      <GridCol m={8} l={9}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Chip size="lg">
            <Avatar size="lg" avatarText={reservation.customer.name} />
            <ChipTextContainer>
              <ChipTitle text={reservation.customer.name} />
              <ChipDescriptionList>
                <li className="chip__description__item chip__description__item--time">
                  <LocalReservationTime reservation={reservation} />
                </li>
              </ChipDescriptionList>
            </ChipTextContainer>
          </Chip>
          {btnSeat && (
              <div>
                <Button
                    buttonStyle="secondary"
                    size="sm"
                    disabled={false}
                    onClick={onClickBtnSeat}
                >
                  {"Seat"}
                </Button>
              </div>
          )}
        </div>

      </GridCol>

      <GridCol s={0} m={4} l={3}>
        {conflict}
        <ul className="rsvp-list__item--left__status">
          <li className="rsvp-list__item--left__status-count">
            <h6 className="margin-reset--bottom">{reservation.party_size}</h6>
          </li>
          <ul>
            <li className="rsvp-list__item--left__status-icon">
              <span className="margin-right--8">{reservationNotes(reservation.party_notes)}</span>
              <span className="margin-right--8">{tagCheck(reservation.tags, reservation.customer.tags)}</span>
            </li>
            <li className="rsvp-list__item--left__status-icon">
              <RestReservationStatus
                restRSVPStatus={reservation.reservation_status} />
            </li>
          </ul>
        </ul>
      </GridCol>
    </GridRow>
  );
};

export default ReservationChip;
