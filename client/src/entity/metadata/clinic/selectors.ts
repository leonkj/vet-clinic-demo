import { createSelector } from 'reselect';
import { getMetadataState } from '../selectors';

export const getClinicMetadataState = createSelector(
  getMetadataState,
  state => state.clinics
);
export const isLoading = createSelector(
  getClinicMetadataState,
  state => state.isLoading
);
