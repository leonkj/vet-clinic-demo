import { graphqlClient } from '../../utils/graphqlClient';
import { ALL_SERVICES_QUERY } from './graphql';
import { normalize } from 'normalizr';
import { arrayOfServicesSchema } from './schema';
import { store } from '../../store';
import { setClinics } from './actions';
import { FetchAllServicesResponse } from './interfaces';
import { ServiceMetadataService } from '../metadata/service/service';

export class ServiceService {
  static async fetchAll(): Promise<FetchAllServicesResponse> {
    return graphqlClient.query({
      query: ALL_SERVICES_QUERY,
    });
  }

  static async updateAllInDb() {
    ServiceMetadataService.setIsLoading(true);
    let response = await ServiceService.fetchAll();
    ServiceMetadataService.setIsLoading(false);
    let services = response.data.services;
    let normalizedServices = normalize(services, arrayOfServicesSchema).entities
      .service;
    store.dispatch(setClinics(normalizedServices));
  }
}
