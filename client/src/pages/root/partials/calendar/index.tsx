import { connect } from 'react-redux';
import {
  CalendarViewTypes,
  EventCalendar,
} from '../../../../components/event-calendar';
import React, { useCallback } from 'react';
import * as RootPageSelectors from '../../selectors';
import { RootState } from '../../../../reducer';
import { RootPageService } from '../../service';
import * as AppointmentsSelectors from '../../../../entity/appointment/selectors';
import * as ClinicSelectors from '../../../../entity/clinic/selectors';
import * as DoctorSelectors from '../../../../entity/doctor/selectors';
import { iAppointment } from '../../../../entity/appointment/interfaces';
import { AppointmentModel } from '../../../../entity/appointment/model';
import ModalService from '../../../../components/modal/service';
import {
  AppointmentModal,
  AppointmentsModalType,
} from './partials/appointment-modal';

type ComponentProps = {
  view: CalendarViewTypes;
  date: number;
  currentDoctorId: string | undefined;
  currentClinicId: string | undefined;
  appointments: iAppointment[];
};

const Component = (props: ComponentProps) => {
  const showCreateAppointmentModal = useCallback(
    data => {
      ModalService.showModal(
        <AppointmentModal
          type={AppointmentsModalType.CREATE}
          startDate={data.start}
          endDate={data.end}
          doctorId={props.currentDoctorId}
          clinicId={props.currentClinicId}
        />
      );
    },
    [props]
  );

  const showEditAppointmentModal = useCallback(event => {
    let appointment = AppointmentModel.findById(event.resource);
    if (!appointment) {
      return;
    }
    let doctor = appointment.getDoctor();
    let clinicId;
    if (doctor) {
      clinicId = doctor.getClinicId();
    }
    ModalService.showModal(
      <AppointmentModal
        type={AppointmentsModalType.EDIT}
        startDate={new Date(appointment.getStart())}
        endDate={new Date(appointment.getEnd())}
        doctorId={appointment.getDoctorId()}
        clinicId={clinicId}
        clientId={appointment.getClientId()}
        appointmentId={event.resource}
        selectedServices={appointment.getServices()}
      />
    );
  }, []);

  return (
    <EventCalendar
      view={props.view}
      selectable={true}
      onSelectSlot={showCreateAppointmentModal}
      onSelectEvent={showEditAppointmentModal}
      date={new Date(props.date)}
      views={['day', 'week', 'month']}
      events={getCalendarEvents(props)}
      onNavigate={(date: Date) => {
        RootPageService.setCalendarDate(date.getTime());
      }}
      onView={viewType => {
        RootPageService.setCalendarViewType(viewType);
      }}
    />
  );
};

let mapStateToProps = (state: RootState) => ({
  view: RootPageSelectors.getCalendarViewType(state),
  date: RootPageSelectors.getCalendarDate(state),
  currentDoctorId: RootPageSelectors.getCurrentDoctorId(state),
  currentClinicId: RootPageSelectors.getCurrentClinicId(state),
  appointments: AppointmentsSelectors.getAppointmentsArray(state),
  clinics: ClinicSelectors.getClinics(state),
  doctors: DoctorSelectors.getDoctors(state),
});

export const Calendar = connect(mapStateToProps)(Component);

function getCalendarEvents(props: ComponentProps) {
  let appointments = props.appointments.filter(appointment => {
    let wrappedAppointment = new AppointmentModel(appointment);
    let clinic;
    let doctor = wrappedAppointment.getDoctor();
    if (doctor) {
      clinic = doctor.getClinic();
    }
    if (!props.currentClinicId || !clinic) {
      return false;
    }
    if (clinic.getId() !== props.currentClinicId) {
      return false;
    }
    return !(
      props.currentDoctorId &&
      wrappedAppointment.getDoctorId() !== props.currentDoctorId
    );
  });
  return appointments.map(appointment => {
    let wrappedAppointment = new AppointmentModel(appointment);
    let doctor = wrappedAppointment.getDoctor();
    let title;
    if (doctor) {
      title = doctor.getName();
    }
    return {
      title: title || 'unknown',
      start: new Date(wrappedAppointment.getStart()),
      end: new Date(wrappedAppointment.getEnd()),
      resource: wrappedAppointment.getId(),
    };
  });
}
