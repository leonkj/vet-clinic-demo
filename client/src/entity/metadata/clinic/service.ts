import { store } from '../../../store';
import { setIsLoading } from './actions';

export class ClinicMetadataService {
  static setIsLoading(isLoading: boolean) {
    store.dispatch(setIsLoading(isLoading));
  }
}
