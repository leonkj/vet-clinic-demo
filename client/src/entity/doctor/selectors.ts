import { createSelector } from 'reselect';
import { getDbState } from '../../selectors';

export const getDoctors = createSelector(
  getDbState,
  state => state.doctors
);
export const getDoctorsArray = createSelector(
  getDoctors,
  state => Object.values(state)
);
