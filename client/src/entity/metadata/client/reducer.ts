import { ReduxAction } from '../../../common/interfaces/ReduxAction';
import { CLIENT_METADATA_ACTION_TYPES } from './actions';

export interface ClientMetadataState {
  isLoading: boolean;
}

const defaultState = {
  isLoading: false,
};

export const clientMetadataReducer = (
  state: ClientMetadataState = defaultState,
  action: ReduxAction<CLIENT_METADATA_ACTION_TYPES>
) => {
  switch (action.type) {
    case CLIENT_METADATA_ACTION_TYPES.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
