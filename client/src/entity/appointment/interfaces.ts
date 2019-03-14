import { iClinic } from '../clinic/interfaces';
import { iDoctor } from '../doctor/interfaces';
import { iService } from '../service/interfaces';
import { iClient } from '../client/interface';

export interface iAppointment {
  id: string;
  clinic: string;
  client: string;
  doctor: string;
  start: string;
  services: string[];
  end: string;
}

export interface FetchAllAppointmentsResponse {
  data: {
    appointments: {
      id: string;
      clinic: iClinic;
      client: iClient;
      doctor: iDoctor;
      services: iService[];
      start: number;
      end: number;
    }[];
  };
}

export interface CreateAppointmentResponse {
  data: {
    CreateAppointment: {
      mutatedId: string;
    };
  };
}

export interface UpdateAppointmentResponse {
  data: {
    UpdateAppointment: {
      mutatedId: string;
    };
  };
}

export interface AppointmentsState {
  [key: string]: iAppointment;
}
