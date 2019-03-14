import { ReactNode } from 'react';

export enum MODAL_ACTION_TYPES {
  SHOW_MODAL = '[Modal] Show modal',
  CLOSE_MODAL = '[Modal] Close modal',
  SHOW_NEXT_MODAL = '[Modal] Sow next modal',
  SHOW_PREVIOUS_MODAL = '[Modal] Sow previous modal',
}

export const showModal = (modal: ReactNode) => {
  return {
    type: MODAL_ACTION_TYPES.SHOW_MODAL,
    payload: modal,
  };
};

export const closeModal = () => {
  return {
    type: MODAL_ACTION_TYPES.CLOSE_MODAL,
  };
};

export const showNextModal = (modal: ReactNode) => {
  return {
    type: MODAL_ACTION_TYPES.SHOW_NEXT_MODAL,
    payload: modal,
  };
};

export const showPreviousModal = () => {
  return {
    type: MODAL_ACTION_TYPES.SHOW_PREVIOUS_MODAL,
  };
};
