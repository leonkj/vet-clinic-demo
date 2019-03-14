import { store } from '../../../store';
import { setIsLoading } from './actions';

export class ServiceMetadataService {
  static setIsLoading(isLoading: boolean) {
    store.dispatch(setIsLoading(isLoading));
  }
}
