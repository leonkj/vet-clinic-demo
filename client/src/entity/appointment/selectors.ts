import { createSelector } from 'reselect';
import { getDbState } from '../../selectors';

export const getAppointments = createSelector(
  getDbState,
  state => state.appointments
);
export const getAppointmentsArray = createSelector(
  getAppointments,
  state => Object.values(state)
);
