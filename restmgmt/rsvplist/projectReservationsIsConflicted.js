import * as moment from 'moment-timezone';

function projectReservationIsConflicted(reservation, reservations) {
  const cloneReservation = {...reservation};

  if (cloneReservation.floor_plan_table == null) {
    cloneReservation.isConflicted = false;
  } else {
    const reservationStartAt = moment(reservation.scheduled_start_at);
    const reservationEndAt = moment(reservation.scheduled_end_at);

    cloneReservation.isConflicted = reservations.some(otherReservation => {
      // Ignore if other reservation is original reservation.
      if (otherReservation.id === reservation.id) {
        return false;
      }

      // Ignore if reservations aren't for same table.
      if (otherReservation.floor_plan_table == null || otherReservation.floor_plan_table.id !== reservation.floor_plan_table.id) {
        return false;
      }

      const otherReservationStartAt = moment(otherReservation.scheduled_start_at);
      const otherReservationEndAt = moment(otherReservation.scheduled_end_at);

      return (
        reservationStartAt.isBetween(otherReservationStartAt, otherReservationEndAt, null, '[]')
        ||
        reservationEndAt.isBetween(otherReservationStartAt, otherReservationEndAt, null, '[]')
      )
    });
  }

  return cloneReservation;
}

export function projectReservationsIsConflicted(reservations) {
  return reservations.map(reservation => projectReservationIsConflicted(reservation, reservations));
}
