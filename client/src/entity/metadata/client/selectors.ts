import { createSelector } from 'reselect';
import { getMetadataState } from '../selectors';

export const getClientMetadataState = createSelector(
  getMetadataState,
  state => state.clients
);
export const isLoading = createSelector(
  getClientMetadataState,
  state => state.isLoading
);
