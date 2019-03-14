import { ReduxAction } from '../../common/interfaces/ReduxAction';
import { CLINIC_ACTION_TYPES } from './actions';
import { ClinicsState } from './interfaces';

const defaultState: ClinicsState = {};

export const clinicsReducer = (
  state: ClinicsState = defaultState,
  action: ReduxAction<CLINIC_ACTION_TYPES>
): ClinicsState => {
  switch (action.type) {
    case CLINIC_ACTION_TYPES.SET_CLINICS:
      return action.payload;
    default:
      return state;
  }
};
