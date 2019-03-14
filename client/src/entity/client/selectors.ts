import { createSelector } from 'reselect';
import { getDbState } from '../../selectors';

export const getClients = createSelector(
  getDbState,
  state => state.clients
);

export const getClientsArray = createSelector(
  getClients,
  state => Object.values(state)
);
