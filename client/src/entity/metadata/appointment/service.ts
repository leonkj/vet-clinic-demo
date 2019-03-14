import { store } from '../../../store';
import { setFilters, setIsLoading } from './actions';
import { AppointmentsFilter } from '../../appointment/service';

export class AppointmentMetadataService {
  static setIsloading(isLoading: boolean) {
    store.dispatch(setIsLoading(isLoading));
  }

  static setFilters(filters: AppointmentsFilter) {
    store.dispatch(setFilters(filters));
  }
}
