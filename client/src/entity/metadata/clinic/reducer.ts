import { ReduxAction } from '../../../common/interfaces/ReduxAction';
import { CLINIC_METADATA_ACTION_TYPES } from './actions';

export interface ClinicMetadataState {
  isLoading: boolean;
}

const defaultState = {
  isLoading: false,
};

export const clinicMetadataReducer = (
  state: ClinicMetadataState = defaultState,
  action: ReduxAction<CLINIC_METADATA_ACTION_TYPES>
) => {
  switch (action.type) {
    case CLINIC_METADATA_ACTION_TYPES.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
