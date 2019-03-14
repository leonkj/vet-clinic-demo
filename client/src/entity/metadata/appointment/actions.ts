import { AppointmentsFilter } from '../../appointment/service';

export enum APPOINTMENT_METADATA_ACTION_TYPES {
  SET_IS_LOADING = '[Appointment Metadata] Set is loading',
  SET_FILTERS = '[Appointment Metadata] Set filters',
}

export const setIsLoading = (isloading: boolean) => {
  return {
    type: APPOINTMENT_METADATA_ACTION_TYPES.SET_IS_LOADING,
    payload: isloading,
  };
};

export const setFilters = (filters: AppointmentsFilter) => {
  return {
    type: APPOINTMENT_METADATA_ACTION_TYPES.SET_FILTERS,
    payload: filters,
  };
};
