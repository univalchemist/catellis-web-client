import * as moment from 'moment-timezone';

export function findUpcomingReservations(reservations) {
  const now = moment();

  return reservations
    .filter(reservation => {
      const reservationStartAt = moment(reservation.scheduled_start_at);
      const seated_at = reservation.seated_at;
      return reservationStartAt.isAfter(now) && !seated_at;
    });
}

export function findSeatReservations(reservations) {
    return reservations
        .filter(reservation => {
            return reservation.reservation_status === 'seated';
        });
}

export function findCurrentReservation(reservations) {
  const now = moment();

  return reservations
    .find(reservation => {
      const reservationStartAt = moment(reservation.scheduled_start_at);
      const reservationEndAt = moment(reservation.scheduled_end_at);

      return reservationStartAt.isSameOrBefore(now) && reservationEndAt.isSameOrAfter(now);
    });
}

export function hasTablesConflicts(reservations) {
  return reservations.some(reservation => reservation.table_conflicted === true);
}
