import { iDoctor } from './interfaces';
import { store } from '../../store';
import { getDoctors, getDoctorsArray } from './selectors';
import { ClinicModel } from '../clinic/model';

export class DoctorModel {
  private doctor: iDoctor;

  constructor(doctor: iDoctor) {
    this.doctor = JSON.parse(JSON.stringify(doctor));
  }

  getName() {
    return this.doctor.firstName + ' ' + this.doctor.lastName;
  }

  getClinicId() {
    return this.doctor.clinic;
  }

  getClinic() {
    return ClinicModel.findById(this.doctor.clinic);
  }

  getId() {
    return this.doctor.id;
  }

  getSpecialization() {
    return this.doctor.specialization;
  }

  toJSON() {
    return this.doctor;
  }

  static findAll() {
    let state = store.getState();
    return getDoctorsArray(state).map(rawDoctor => new DoctorModel(rawDoctor));
  }

  static findById(id: any) {
    let state = store.getState();
    let rawDoctor = getDoctors(state)[id];
    if (rawDoctor) {
      return new DoctorModel(rawDoctor);
    }
  }

  static fromArray(doctors: iDoctor[]) {
    return doctors.map(rawDoctor => new DoctorModel(rawDoctor));
  }
}
