import restaurantLocalDatetime from 'shared/time/restaurant-local-datetime';

const LocalReservationTime = ({reservation}) => {
  const reservationMoment = restaurantLocalDatetime(reservation.restaurant, reservation.scheduled_start_at)

  return reservationMoment.format('h:mm a');
};

export default LocalReservationTime;
