import { graphqlClient } from '../../utils/graphqlClient';
import { normalize } from 'normalizr';
import { store } from '../../store';
import {
  ALL_APPOINTMENTS_QUERY,
  CREATE_APPOINTMENT_MUTATION,
  GET_APPOINTMENT_QUERY,
  UPDATE_APPOINTMENT_MUTATION,
} from './graphql';
import {
  CreateAppointmentResponse,
  FetchAllAppointmentsResponse,
  iAppointment,
  UpdateAppointmentResponse,
} from './interfaces';
import { arrayOfAppointmentsSchema } from './schema';
import { setAppointments } from './actions';
import { AppointmentMetadataService } from '../metadata/appointment/service';
import { AppointmentModel } from './model';

export interface AppointmentsFilter {
  start: Date;
  stop: Date;
  clinicId: string;
  doctorId?: string;
  clientId?: string;
}

export interface UpdateAppointmentInput {
  start: Date;
  stop: Date;
  id: string;
}

export interface CreateAppointmentInput {
  clinicId: string;
  clientId: string;
  doctorId: string;
  services: string[];
  start: Date;
  stop: Date;
}

export class AppointmentService {
  static async fetchAll(
    filter: AppointmentsFilter
  ): Promise<FetchAllAppointmentsResponse> {
    return graphqlClient.query({
      query: ALL_APPOINTMENTS_QUERY,
      variables: { input: filter },
    });
  }

  static async create(
    appointment: CreateAppointmentInput
  ): Promise<CreateAppointmentResponse> {
    return graphqlClient.mutate({
      mutation: CREATE_APPOINTMENT_MUTATION,
      variables: { input: appointment },
    });
  }

  static async update(
    appointment: UpdateAppointmentInput
  ): Promise<UpdateAppointmentResponse> {
    return graphqlClient.mutate({
      mutation: UPDATE_APPOINTMENT_MUTATION,
      variables: { input: appointment },
    });
  }

  static async getOne(id: string): Promise<FetchAllAppointmentsResponse> {
    return graphqlClient.query({
      query: GET_APPOINTMENT_QUERY,
      variables: { input: id },
    });
  }

  static async updateAllInDb(filter: AppointmentsFilter) {
    AppointmentMetadataService.setIsloading(true);
    AppointmentMetadataService.setFilters(filter);
    let response = await AppointmentService.fetchAll(filter);
    AppointmentMetadataService.setIsloading(false);
    let appointments = response.data.appointments;
    let normalizedAppointments = normalize(
      appointments,
      arrayOfAppointmentsSchema
    ).entities.appointment;
    store.dispatch(setAppointments(normalizedAppointments));
  }

  static async createAndUpdateDb(appointment: CreateAppointmentInput) {
    AppointmentMetadataService.setIsloading(true);
    let response = await AppointmentService.create(appointment);
    let appointmentId = response.data.CreateAppointment.mutatedId;
    let newAppointment: iAppointment = {
      id: appointmentId,
      clinic: appointment.clinicId,
      doctor: appointment.doctorId,
      services: appointment.services,
      client: appointment.clientId,
      start: appointment.start.toString(),
      end: appointment.stop.toString(),
    };
    store.dispatch(setAppointments({ [newAppointment.id]: newAppointment }));
    AppointmentMetadataService.setIsloading(true);
  }

  static async editAndUpdateDb(appointment: UpdateAppointmentInput) {
    AppointmentMetadataService.setIsloading(true);
    await AppointmentService.update(appointment);
    let editedAppointment = AppointmentModel.findById(appointment.id);
    if (editedAppointment) {
      editedAppointment.setStartDate(appointment.start.toString());
      editedAppointment.setEndDate(appointment.stop.toString());
      store.dispatch(
        setAppointments({
          [editedAppointment.getId()]: editedAppointment.toJSON(),
        })
      );
    }
    AppointmentMetadataService.setIsloading(true);
  }
}
