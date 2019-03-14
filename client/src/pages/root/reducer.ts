import { ReduxAction } from '../../common/interfaces/ReduxAction';
import { ROOT_PAGE_ACTIONS } from './actions';
import moment from 'moment';
import {
  CalendarViewTypes,
  CalendarViewType,
} from '../../components/event-calendar';

export interface RootPageState {
  currentDoctorId: string | undefined;
  currentClinicId: string | undefined;
  calendarDate: number;
  calendarViewType: CalendarViewTypes;
}

let defaultState: RootPageState = {
  currentDoctorId: undefined,
  currentClinicId: undefined,
  calendarDate: moment().valueOf(),
  calendarViewType: CalendarViewType.WEEK,
};

export const rootPageReducer = (
  state: RootPageState = defaultState,
  action: ReduxAction<ROOT_PAGE_ACTIONS>
): RootPageState => {
  switch (action.type) {
    case ROOT_PAGE_ACTIONS.SET_CURRENT_DOCTOR:
      return { ...state, currentDoctorId: action.payload };
    case ROOT_PAGE_ACTIONS.SET_CURRENT_CLINIC:
      return { ...state, currentClinicId: action.payload };
    case ROOT_PAGE_ACTIONS.SET_CALENDAR_DATE:
      return { ...state, calendarDate: action.payload };
    case ROOT_PAGE_ACTIONS.SET_CALENDAR_VIEW_TYPE:
      return { ...state, calendarViewType: action.payload };
    default:
      return state;
  }
};
