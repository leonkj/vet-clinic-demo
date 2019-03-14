import { clinicsReducer } from '../reducer';
import { setClinics } from '../actions';

describe('Clinics reducer', () => {
  it('should return default state on invalid action', () => {
    let defaultState = {};
    let result = clinicsReducer(defaultState, {
      // @ts-ignore
      type: 'invalid',
      payload: null,
    });
    expect(result).toEqual(defaultState);
  });

  it('should properly set clinics list', () => {
    let clinicsList = {
      1: {
        id: 1,
        name: 'name1',
      },
      2: {
        id: 2,
        name: 'name2',
      },
    };
    let result = clinicsReducer({}, setClinics(clinicsList));
    expect(result).toEqual(clinicsList);
  });
});
