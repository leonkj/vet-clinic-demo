import { store } from '../../store';
import { iAppointment } from './interfaces';
import { getAppointments, getAppointmentsArray } from './selectors';
import { ClinicModel } from '../clinic/model';
import { DoctorModel } from '../doctor/model';

export class AppointmentModel {
  private appointment: iAppointment;

  constructor(appointment: iAppointment) {
    this.appointment = JSON.parse(JSON.stringify(appointment));
  }

  getId() {
    return this.appointment.id;
  }

  setStartDate(date: string) {
    this.appointment.start = date;
  }

  setEndDate(date: string) {
    this.appointment.end = date;
  }

  getDoctorId() {
    return this.appointment.doctor;
  }

  getClientId() {
    return this.appointment.client;
  }

  getServices() {
    return this.appointment.services;
  }

  getClinicId() {
    return this.appointment.clinic;
  }

  getDoctor() {
    return DoctorModel.findById(this.appointment.doctor);
  }

  getClinic() {
    return ClinicModel.findById(this.appointment.clinic);
  }

  getStart() {
    return this.appointment.start;
  }

  getEnd() {
    return this.appointment.end;
  }

  toJSON() {
    return this.appointment;
  }

  static findAll() {
    let state = store.getState();
    return getAppointmentsArray(state).map(
      rawAppointment => new AppointmentModel(rawAppointment)
    );
  }

  static findById(id: any) {
    let state = store.getState();
    let rawAppointment = getAppointments(state)[id];
    if (rawAppointment) {
      return new AppointmentModel(rawAppointment);
    }
  }
}
