import { createSelector } from 'reselect';
import { getDbState } from '../../selectors';

export const getClinics = createSelector(
  getDbState,
  state => state.clinics
);

export const getClinicsArray = createSelector(
  getClinics,
  state => Object.values(state)
);
