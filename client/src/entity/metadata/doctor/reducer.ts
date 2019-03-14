import { ReduxAction } from '../../../common/interfaces/ReduxAction';
import { DOCTOR_METADATA_ACTION_TYPES } from './actions';

export interface DoctorMetadataState {
  isLoading: boolean;
}

const defaultState = {
  isLoading: false,
};

export const doctorMetadataReducer = (
  state: DoctorMetadataState = defaultState,
  action: ReduxAction<DOCTOR_METADATA_ACTION_TYPES>
) => {
  switch (action.type) {
    case DOCTOR_METADATA_ACTION_TYPES.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
