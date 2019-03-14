import { store } from '../../store';
import * as RootPageActions from './actions';
import {
  CalendarViewType,
  CalendarViewTypes,
} from '../../components/event-calendar';
import { DoctorService } from '../../entity/doctor/service';
import { AppointmentService } from '../../entity/appointment/service';
import moment from 'moment';
import { RootState } from '../../reducer';
import * as RootPageSelectors from './selectors';
import { ClientService } from '../../entity/client/service';

export class RootPageService {
  static setCurrentClinic(clinicId: string | undefined) {
    if (clinicId) {
      DoctorService.updateAllInDb(clinicId).catch();
      ClientService.updateAllInDb(clinicId).catch();
    }
    RootPageService.setCurrentDoctor(undefined);
    store.dispatch(RootPageActions.setCurrentClinic(clinicId));
    RootPageService.updateAppointments({ clinicId: clinicId });
  }

  static setCurrentDoctor(doctorId: string | undefined) {
    store.dispatch(RootPageActions.setCurrentDoctor(doctorId));
    RootPageService.updateAppointments({ doctorId: doctorId });
  }

  static setCalendarDate(date: number) {
    store.dispatch(RootPageActions.setCalendarDate(date));
    RootPageService.updateAppointments({ calendarDate: date });
  }

  static setCalendarViewType(viewType: CalendarViewTypes) {
    store.dispatch(RootPageActions.setCalendarViewType(viewType));
    RootPageService.updateAppointments({ calendarViewType: viewType });
  }

  static updateAppointments({
    state = store.getState(),
    clinicId = RootPageSelectors.getCurrentClinicId(state),
    doctorId = RootPageSelectors.getCurrentDoctorId(state),
    calendarDate = RootPageSelectors.getCalendarDate(state),
    calendarViewType = RootPageSelectors.getCalendarViewType(state),
  }: {
    state?: RootState;
    clinicId?: string | undefined;
    doctorId?: string | undefined;
    calendarDate?: number;
    calendarViewType?: CalendarViewTypes;
  }) {
    let start, stop;
    let date = moment(calendarDate);
    switch (calendarViewType) {
      case CalendarViewType.DAY:
        start = date.startOf('day').toDate();
        stop = date.endOf('day').toDate();
        break;
      case CalendarViewType.WEEK:
        start = date.startOf('week').toDate();
        stop = date.endOf('week').toDate();
        break;
      case CalendarViewType.MONTH:
        start = date.startOf('month').toDate();
        stop = date.endOf('month').toDate();
        break;
      default:
        return;
    }
    if (!start || !stop || !clinicId) {
      return;
    }
    AppointmentService.updateAllInDb({
      clinicId,
      doctorId,
      start,
      stop,
    }).catch();
  }
}
