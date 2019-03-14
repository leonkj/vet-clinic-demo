import { store } from '../../../store';
import { setIsLoading } from './actions';

export class DoctorMetadataService {
  static setIsLoading(isLoading: boolean) {
    store.dispatch(setIsLoading(isLoading));
  }
}
