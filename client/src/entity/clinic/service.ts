import { graphqlClient } from '../../utils/graphqlClient';
import { ALL_CLINICS_QUERY } from './graphql';
import { normalize } from 'normalizr';
import { arrayOfClinicsSchema } from './schema';
import { store } from '../../store';
import { setClinics } from './actions';
import { FetchAllClinicsResponse } from './interfaces';
import { ClinicMetadataService } from '../metadata/clinic/service';

export class ClinicService {
  static async fetchAll(): Promise<FetchAllClinicsResponse> {
    return graphqlClient.query({
      query: ALL_CLINICS_QUERY,
    });
  }

  static async updateAllInDb() {
    ClinicMetadataService.setIsLoading(true);
    let response = await ClinicService.fetchAll();
    ClinicMetadataService.setIsLoading(false);
    let clinics = response.data.clinics;
    let normalizedClinics = normalize(clinics, arrayOfClinicsSchema).entities
      .clinic;
    store.dispatch(setClinics(normalizedClinics));
  }
}
