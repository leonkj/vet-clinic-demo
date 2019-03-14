import { CalendarViewTypes } from '../../components/event-calendar';

export enum ROOT_PAGE_ACTIONS {
  SET_CURRENT_CLINIC = '[Root page] Set current clinic',
  SET_CURRENT_DOCTOR = '[Root page] Set current doctor',
  SET_CALENDAR_DATE = '[Root page] Set calendar date',
  SET_CALENDAR_VIEW_TYPE = '[Root page] Set calendar view type',
}

export const setCurrentClinic = (clinicId: string | undefined) => {
  return {
    type: ROOT_PAGE_ACTIONS.SET_CURRENT_CLINIC,
    payload: clinicId,
  };
};

export const setCurrentDoctor = (doctorId: string | undefined) => {
  return {
    type: ROOT_PAGE_ACTIONS.SET_CURRENT_DOCTOR,
    payload: doctorId,
  };
};

export const setCalendarDate = (date: number) => {
  return {
    type: ROOT_PAGE_ACTIONS.SET_CALENDAR_DATE,
    payload: date,
  };
};

export const setCalendarViewType = (viewType: CalendarViewTypes) => {
  return {
    type: ROOT_PAGE_ACTIONS.SET_CALENDAR_VIEW_TYPE,
    payload: viewType,
  };
};
