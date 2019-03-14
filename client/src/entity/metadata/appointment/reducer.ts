import { ReduxAction } from '../../../common/interfaces/ReduxAction';
import { APPOINTMENT_METADATA_ACTION_TYPES } from './actions';

export interface AppointmentMetadataState {
  isLoading: boolean;
  filters: {
    start: number | undefined;
    end: number | undefined;
    clinicId: string | undefined;
    doctorId: string | undefined;
    clientId: string | undefined;
  };
}
const defaultState = {
  isLoading: false,
  filters: {
    start: undefined,
    end: undefined,
    clinicId: undefined,
    doctorId: undefined,
    clientId: undefined,
  },
};
export const appointmentMetadataReducer = (
  state: AppointmentMetadataState = defaultState,
  action: ReduxAction<APPOINTMENT_METADATA_ACTION_TYPES>
) => {
  switch (action.type) {
    case APPOINTMENT_METADATA_ACTION_TYPES.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case APPOINTMENT_METADATA_ACTION_TYPES.SET_FILTERS:
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};
