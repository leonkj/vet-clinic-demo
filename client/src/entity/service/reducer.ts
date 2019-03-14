import { ReduxAction } from '../../common/interfaces/ReduxAction';
import { SERVICE_ACTION_TYPES } from './actions';
import { ServicesState } from './interfaces';

const defaultState: ServicesState = {};

export const servicesReducer = (
  state: ServicesState = defaultState,
  action: ReduxAction<SERVICE_ACTION_TYPES>
): ServicesState => {
  switch (action.type) {
    case SERVICE_ACTION_TYPES.SET_SERVICES:
      return action.payload;
    default:
      return state;
  }
};
