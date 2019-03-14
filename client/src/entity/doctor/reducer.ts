import { ReduxAction } from '../../common/interfaces/ReduxAction';
import { DOCTOR_ACTION_TYPES } from './actions';
import { DoctorsState } from './interfaces';

const defaultState: DoctorsState = {};

export const doctorsReducer = (
  state: DoctorsState = defaultState,
  action: ReduxAction<DOCTOR_ACTION_TYPES>
): DoctorsState => {
  switch (action.type) {
    case DOCTOR_ACTION_TYPES.SET_DOCTORS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
