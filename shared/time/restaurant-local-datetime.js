import * as moment from 'moment-timezone';

export function restaurantLocalDatetime(restaurant, datetime) {
  return moment(datetime).tz(restaurant.timezone_name);
}

export default restaurantLocalDatetime;
