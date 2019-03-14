import { createSelector } from 'reselect';
import { getUiState } from '../../selectors';

export const getModalState = createSelector(
  getUiState,
  state => state.modal
);
export const getCurrentModal = createSelector(
  getModalState,
  state => state.currentModal
);
