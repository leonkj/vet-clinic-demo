export interface iClinic {
  name: string;
  id: string;
}

export interface FetchAllClinicsResponse {
  data: {
    clinics: iClinic[];
  };
}

export interface ClinicsState {
  [key: string]: iClinic;
}
