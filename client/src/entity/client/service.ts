import { graphqlClient } from '../../utils/graphqlClient';
import { CLENTS_BY_CLINIC_QUERY } from './graphql';
import { normalize } from 'normalizr';
import { FetchAllClientsResponse } from './interface';
import { arrayOfClientsSchema } from './schema';
import { ClientsMetadataService } from '../metadata/client/service';
import { store } from '../../store';
import { setClients } from './actions';

export class ClientService {
  static async fetchAll(clinicId: string): Promise<FetchAllClientsResponse> {
    return graphqlClient.query({
      query: CLENTS_BY_CLINIC_QUERY,
      variables: { clinicId },
    });
  }

  static async updateAllInDb(clinicId: string) {
    ClientsMetadataService.setIsLoading(true);
    let response = await ClientService.fetchAll(clinicId);
    ClientsMetadataService.setIsLoading(false);
    let clients = response.data.clients;
    let normalizedClients = normalize(clients, arrayOfClientsSchema).entities
      .client;
    store.dispatch(setClients(normalizedClients));
  }
}
