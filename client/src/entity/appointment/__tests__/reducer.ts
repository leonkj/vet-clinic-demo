import { appointmentsReducer } from '../reducer';
import { setAppointments } from '../actions';

describe('Appointments reducer', () => {
  it('should return default state on invalid action', () => {
    let defaultState = {};
    let result = appointmentsReducer(defaultState, {
      // @ts-ignore
      type: 'invalid',
      payload: null,
    });
    expect(result).toEqual(defaultState);
  });

  it('should properly set appointments list', () => {
    let appointmentsList = {
      1: {
        id: 1,
        clinic: 3,
        doctor: 33,
      },
      2: {
        id: 2,
        clinic: 4,
        doctor: 34,
      },
    };
    let result = appointmentsReducer({}, setAppointments(appointmentsList));
    expect(result).toEqual(appointmentsList);
  });
});
