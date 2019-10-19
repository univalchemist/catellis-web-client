import * as moment from 'moment-timezone';

export function findUpcomingReservations(reservations) {
  const now = moment();

  return reservations
    .filter(reservation => {
      const reservationStartAt = moment(reservation.scheduled_start_at);

      return reservationStartAt.isAfter(now);
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
