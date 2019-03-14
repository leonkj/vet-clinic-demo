import { combineReducers } from 'redux';
import {
  appointmentMetadataReducer,
  AppointmentMetadataState,
} from './appointment/reducer';
import { clinicMetadataReducer, ClinicMetadataState } from './clinic/reducer';
import { doctorMetadataReducer, DoctorMetadataState } from './doctor/reducer';
import { clientMetadataReducer, ClientMetadataState } from './client/reducer';
import {
  serviceMetadataReducer,
  ServiceMetadataState,
} from './service/reducer';

export interface MetadataState {
  appointments: AppointmentMetadataState;
  clinics: ClinicMetadataState;
  clients: ClientMetadataState;
  doctors: DoctorMetadataState;
  services: ServiceMetadataState;
}

export const metadataReducer = combineReducers({
  appointments: appointmentMetadataReducer,
  clinics: clinicMetadataReducer,
  clients: clientMetadataReducer,
  doctors: doctorMetadataReducer,
  services: serviceMetadataReducer,
});
