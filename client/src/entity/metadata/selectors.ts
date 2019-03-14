import { getDbState } from '../../selectors';
import { createSelector } from 'reselect';

export const getMetadataState = createSelector(
  getDbState,
  state => state.metadata
);
