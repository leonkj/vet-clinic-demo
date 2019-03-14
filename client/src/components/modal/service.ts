import * as ModalActions from './actions';
import { ReactNode } from 'react';
import { store } from '../../store';

class ModalService {
  static showModal(modal: ReactNode) {
    store.dispatch(ModalActions.showModal(modal));
  }

  static closeModal() {
    store.dispatch(ModalActions.closeModal());
  }

  static showNextModal(modal: ReactNode) {
    store.dispatch(ModalActions.showNextModal(modal));
  }

  static showPreviousModal() {
    store.dispatch(ModalActions.showPreviousModal());
  }
}

export default ModalService;
