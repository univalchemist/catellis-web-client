import * as moment from 'moment-timezone';

import buildProjectedMoment from 'shared/time/build-projected-moment';

export function findBestReservationPlan(activeDate, reservationPlans) {
  if (reservationPlans.length < 1) return null;

  // If there is only one reservation plan, that's the best one.
  if (reservationPlans.length === 1) return reservationPlans[0];

  const now = moment();
  let selectedReservationPlan;

  // Prefer a reservation plan that wraps the current time.
  selectedReservationPlan = reservationPlans.find(candidatePlan => {
    const planEffectiveStart = buildProjectedMoment(activeDate, candidatePlan.effective_time_start_at);
    const planEffectiveEnd = buildProjectedMoment(activeDate, candidatePlan.effective_time_end_at);

    return planEffectiveStart.isSameOrBefore(now) && planEffectiveEnd.isSameOrAfter(now);
  });

  // Return if we found a plan surrounding our current time.
  if (selectedReservationPlan != null) return selectedReservationPlan;

  // Prefer a reservation plan that's nearest to now in the future.
  let diffMs = moment.duration(1, 'months').asMilliseconds();
  reservationPlans.forEach(candidatePlan => {
    const planEffectiveStart = buildProjectedMoment(activeDate, candidatePlan.effective_time_start_at);
    const planEffectiveEnd = buildProjectedMoment(activeDate, candidatePlan.effective_time_end_at);

    // Skip if plan is in the past.
    if (planEffectiveEnd.isBefore(now)) return;

    const candidateDiffMs = planEffectiveStart.diff(now);

    if (candidateDiffMs < diffMs) {
      diffMs = candidateDiffMs;
      selectedReservationPlan = candidatePlan;
    }
  });

  // Return if we found a "soonest" plan.
  if (selectedReservationPlan != null) return selectedReservationPlan;

  // Still no match? Just give up and return the first plan we have in our list.
  return reservationPlans[0];
}

export default findBestReservationPlan;
