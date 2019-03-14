import { createSelector } from 'reselect';
import { getMetadataState } from '../selectors';

export const getServiceMetadataState = createSelector(
  getMetadataState,
  state => state.services
);
export const isLoading = createSelector(
  getServiceMetadataState,
  state => state.isLoading
);
