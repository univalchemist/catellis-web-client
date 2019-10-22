import * as moment from 'moment';

export function timeRangeBuilder(beginningTime, endTime, stepInMinutes = 15) {
  const timeSlots = [],
        loopEndTime = moment(endTime).add(1, 'minutes');
  let currentTime = moment(beginningTime);

  while (currentTime.isBefore(loopEndTime)) {
    timeSlots.push(currentTime);

    currentTime = moment(currentTime).add(stepInMinutes, 'minutes');
  }

  return timeSlots;
}

export default timeRangeBuilder;
