import { iClinic } from '../clinic/interfaces';

export interface iClient {
  id: string;
  clinic: string;
  firstName: string;
  lastName: string;
}

export interface FetchAllClientsResponse {
  data: {
    clients: {
      id: string;
      clinic: iClinic;
      firstName: string;
      lastName: string;
    }[];
  };
}

export interface ClientsState {
  [key: string]: iClient;
}
