export interface iService {
  name?: string;
  id: string;
}

export interface FetchAllServicesResponse {
  data: {
    services: iService[];
  };
}

export interface ServicesState {
  [key: string]: iService;
}
