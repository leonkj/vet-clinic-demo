import { ReduxAction } from '../../common/interfaces/ReduxAction';
import { CLIENT_ACTION_TYPES } from './actions';
import { ClientsState } from './interface';

const defaultState: ClientsState = {};

export const clientsReducer = (
  state: ClientsState = defaultState,
  action: ReduxAction<CLIENT_ACTION_TYPES>
): ClientsState => {
  switch (action.type) {
    case CLIENT_ACTION_TYPES.SET_CLIENTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
