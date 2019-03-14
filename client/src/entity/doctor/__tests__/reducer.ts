import { doctorsReducer } from '../reducer';
import { setDoctors } from '../actions';

describe('Doctors reducer', () => {
  it('should return default state on invalid action', () => {
    let defaultState = {};
    let result = doctorsReducer(defaultState, {
      // @ts-ignore
      type: 'invalid',
      payload: null,
    });
    expect(result).toEqual(defaultState);
  });

  it('should properly set doctors list', () => {
    let doctorsList = {
      '1': {
        id: '1',
        clinic: '3',
      },
      '2': {
        id: '2',
        clinic: '4',
      },
    };
    let result = doctorsReducer({}, setDoctors(doctorsList));
    expect(result).toEqual(doctorsList);
  });
});
