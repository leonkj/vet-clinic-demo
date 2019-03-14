import { createSelector } from 'reselect';
import { getUiState } from '../../selectors';

export const getRootPageState = createSelector(
  getUiState,
  state => state.rootPage
);
export const getCurrentClinicId = createSelector(
  getRootPageState,
  state => state.currentClinicId
);
export const getCurrentDoctorId = createSelector(
  getRootPageState,
  state => state.currentDoctorId
);

export const getCalendarDate = createSelector(
  getRootPageState,
  state => state.calendarDate
);

export const getCalendarViewType = createSelector(
  getRootPageState,
  state => state.calendarViewType
);
