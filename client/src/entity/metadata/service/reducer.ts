import { ReduxAction } from '../../../common/interfaces/ReduxAction';
import { SERVICE_METADATA_ACTION_TYPES } from './actions';

export interface ServiceMetadataState {
  isLoading: boolean;
}

const defaultState = {
  isLoading: false,
};

export const serviceMetadataReducer = (
  state: ServiceMetadataState = defaultState,
  action: ReduxAction<SERVICE_METADATA_ACTION_TYPES>
): ServiceMetadataState => {
  switch (action.type) {
    case SERVICE_METADATA_ACTION_TYPES.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
