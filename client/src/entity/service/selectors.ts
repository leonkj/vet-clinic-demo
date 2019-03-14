import { createSelector } from 'reselect';
import { getDbState } from '../../selectors';

export const getServices = createSelector(
  getDbState,
  state => state.services
);

export const getServicesArray = createSelector(
  getServices,
  state => Object.values(state)
);
