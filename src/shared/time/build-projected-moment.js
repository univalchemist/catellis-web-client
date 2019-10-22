import * as moment from 'moment-timezone';

export function buildProjectedMoment(baseDate, datelessTime) {
  const datelessTimeMoment = moment.tz(datelessTime, 'UTC');

  return moment(baseDate)
    .clone()
    .hours(datelessTimeMoment.hours())
    .minutes(datelessTimeMoment.minutes())
    .seconds(0);
}

export default buildProjectedMoment;
