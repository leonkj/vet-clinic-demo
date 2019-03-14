import { store } from '../../../store';
import { setIsLoading } from './actions';

export class ClientsMetadataService {
  static setIsLoading(isLoading: boolean) {
    store.dispatch(setIsLoading(isLoading));
  }
}
