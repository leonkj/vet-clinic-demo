import { store } from '../../store';
import { getClientsArray, getClients } from './selectors';
import { iClient } from './interface';
import { ClinicModel } from '../clinic/model';

export class ClientModel {
  private client: iClient;

  constructor(client: iClient) {
    this.client = JSON.parse(JSON.stringify(client));
  }

  getName() {
    return this.client.firstName + ' ' + this.client.lastName;
  }

  getId() {
    return this.client.id;
  }

  getClinicId() {
    return this.client.clinic;
  }

  getClinic(): ClinicModel | undefined {
    return ClinicModel.findById(this.getClinicId());
  }

  toJSON() {
    return this.client;
  }

  static findAll() {
    let state = store.getState();
    return getClientsArray(state).map(rawClient => new ClientModel(rawClient));
  }

  static findById(id: any) {
    let state = store.getState();
    let rawClient = getClients(state)[id];
    if (rawClient) {
      return new ClientModel(rawClient);
    }
  }

  static fromArray(clients: iClient[]) {
    return clients.map(rawClient => new ClientModel(rawClient));
  }
}
