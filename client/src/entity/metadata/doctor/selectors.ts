import { createSelector } from 'reselect';
import { getMetadataState } from '../selectors';

export const getDoctorMetadataState = createSelector(
  getMetadataState,
  state => state.doctors
);
export const isLoading = createSelector(
  getDoctorMetadataState,
  state => state.isLoading
);
