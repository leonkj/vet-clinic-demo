import { DoctorsState } from './interfaces';

export enum DOCTOR_ACTION_TYPES {
  SET_DOCTORS = '[Doctors] Set doctors',
}

export const setDoctors = (doctors: DoctorsState) => {
  return {
    type: DOCTOR_ACTION_TYPES.SET_DOCTORS,
    payload: doctors,
  };
};
