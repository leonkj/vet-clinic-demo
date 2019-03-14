export enum CLINIC_ACTION_TYPES {
  SET_CLINICS = '[Clinics] Set clinics',
}

export const setClinics = (clinics: any) => {
  return {
    type: CLINIC_ACTION_TYPES.SET_CLINICS,
    payload: clinics,
  };
};
