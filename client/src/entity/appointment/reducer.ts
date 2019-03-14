import { ReduxAction } from '../../common/interfaces/ReduxAction';
import { APPOINTMENT_ACTION_TYPES } from './actions';
import { AppointmentsState } from './interfaces';

const defaultState: AppointmentsState = {};

export const appointmentsReducer = (
  state: AppointmentsState = defaultState,
  action: ReduxAction<APPOINTMENT_ACTION_TYPES>
): AppointmentsState => {
  switch (action.type) {
    case APPOINTMENT_ACTION_TYPES.SET_APPOINTMENTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
