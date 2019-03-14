import { store } from '../../store';
import { iClinic } from './interfaces';
import { getClinics, getClinicsArray } from './selectors';

export class ClinicModel {
  private clinic: iClinic;

  constructor(clinic: iClinic) {
    this.clinic = JSON.parse(JSON.stringify(clinic));
  }

  getName() {
    return this.clinic.name;
  }

  getId() {
    return this.clinic.id;
  }

  toJSON() {
    return this.clinic;
  }

  static findAll() {
    let state = store.getState();
    return getClinicsArray(state).map(rawClinic => new ClinicModel(rawClinic));
  }

  static findById(id: any) {
    let state = store.getState();
    let rawClinic = getClinics(state)[id];
    if (rawClinic) {
      return new ClinicModel(rawClinic);
    }
  }

  static fromArray(clinics: iClinic[]) {
    return clinics.map(rawDoctor => new ClinicModel(rawDoctor));
  }
}
