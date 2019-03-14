import { graphqlClient } from '../../utils/graphqlClient';
import { normalize } from 'normalizr';
import { store } from '../../store';
import { ALL_DOCTORS_QUERY } from './graphql';
import { FetchAllDoctorsResponse } from './interfaces';
import { arrayOfDoctorsSchema } from './schema';
import { setDoctors } from './actions';
import { DoctorMetadataService } from '../metadata/doctor/service';

export class DoctorService {
  static async fetchAll(clinicId: string): Promise<FetchAllDoctorsResponse> {
    return graphqlClient.query({
      query: ALL_DOCTORS_QUERY,
      variables: { clinicId },
    });
  }

  static async updateAllInDb(clinicId: string) {
    DoctorMetadataService.setIsLoading(true);
    let response = await DoctorService.fetchAll(clinicId);
    DoctorMetadataService.setIsLoading(false);
    let doctors = response.data.doctors;
    let normalizedDoctors = normalize(doctors, arrayOfDoctorsSchema).entities
      .doctor;
    DoctorService.setDoctors(normalizedDoctors);
  }

  static setDoctors(doctors: any) {
    store.dispatch(setDoctors(doctors));
  }
}
