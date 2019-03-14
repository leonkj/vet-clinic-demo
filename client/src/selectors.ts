import { RootState } from './reducer';

export const getUiState = (state: RootState) => state.ui;
export const getDbState = (state: RootState) => state.db;
