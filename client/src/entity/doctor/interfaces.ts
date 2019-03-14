import { iClinic } from '../clinic/interfaces';

export interface iDoctor {
  id: string;
  clinic?: string;
  firstName?: string;
  lastName?: string;
  specialization?: string;
}

export interface FetchAllDoctorsResponse {
  data: {
    doctors: {
      id: string;
      clinic?: iClinic;
      firstName?: string;
      lastName?: string;
      specialization?: string;
    };
  };
}

export interface DoctorsState {
  [key: string]: iDoctor;
}
