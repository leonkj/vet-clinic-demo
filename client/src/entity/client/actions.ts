import { ClientsState } from './interface';

export enum CLIENT_ACTION_TYPES {
  SET_CLIENTS = '[Clients Set clients',
}

export const setClients = (clients: ClientsState) => {
  return {
    type: CLIENT_ACTION_TYPES.SET_CLIENTS,
    payload: clients,
  };
};
