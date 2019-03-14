import { MODAL_ACTION_TYPES } from './actions';
import { ReactNode } from 'react';
import { ReduxAction } from '../../common/interfaces/ReduxAction';

export interface ModalState {
  currentModal: ReactNode;
  previousModals: ReactNode[];
}
const defaultState: ModalState = {
  currentModal: null,
  previousModals: [],
};

export const modalReducer = (
  state: ModalState = defaultState,
  action: ReduxAction<MODAL_ACTION_TYPES>
) => {
  switch (action.type) {
    case MODAL_ACTION_TYPES.SHOW_MODAL:
      return { ...state, currentModal: action.payload };

    case MODAL_ACTION_TYPES.CLOSE_MODAL:
      return { ...state, currentModal: null };

    case MODAL_ACTION_TYPES.SHOW_NEXT_MODAL:
      return {
        ...state,
        currentModal: action.payload,
        previousModals: [...state.previousModals, state.currentModal],
      };

    case MODAL_ACTION_TYPES.SHOW_PREVIOUS_MODAL:
      let previousModals = [...state.previousModals];
      let newCurrentModal = state.previousModals.pop();
      return { ...state, previousModals, currentModal: newCurrentModal };

    default:
      return state;
  }
};
