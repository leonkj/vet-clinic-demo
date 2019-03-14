export enum APPOINTMENT_ACTION_TYPES {
  SET_APPOINTMENTS = '[Appointments] Set appointments',
}

export const setAppointments = (appointments: any) => {
  return {
    type: APPOINTMENT_ACTION_TYPES.SET_APPOINTMENTS,
    payload: appointments,
  };
};
