import React from 'react';
import { RootState } from '../../../../reducer';
import { connect } from 'react-redux';
import { getCurrentClinicId, getCurrentDoctorId } from '../../selectors';
import { RootPageService } from '../../service';
import { CalendarFiltersView } from './view';
import * as ClinicMetadataSelectors from '../../../../entity/metadata/clinic/selectors';
import * as DoctorMetadataSelectors from '../../../../entity/metadata/doctor/selectors';
import * as ClinicSelectors from '../../../../entity/clinic/selectors';
import * as DoctorSelectors from '../../../../entity/doctor/selectors';
import { iClinic } from '../../../../entity/clinic/interfaces';
import { iDoctor } from '../../../../entity/doctor/interfaces';
import { DoctorModel } from '../../../../entity/doctor/model';
import { ClinicModel } from '../../../../entity/clinic/model';

interface CalendarFiltersProps {
  clinics: iClinic[];
  doctors: iDoctor[];
  isClinicsLoading: boolean;
  isDoctorsLoading: boolean;
  currentClinicId: any;
  currentDoctorId: any;
  [key: string]: any;
}

const Component = (props: CalendarFiltersProps) => {
  let { currentDoctorOption, doctorOptions } = getDoctorsOptions(props);
  let { currentClinicOption, clinicOptions } = getClinicsOptions(props);
  return (
    <CalendarFiltersView
      clinicOptions={clinicOptions}
      doctorOptions={doctorOptions}
      currentClinicOption={currentClinicOption}
      currentDoctorOption={currentDoctorOption}
      isClinicsLoading={props.isClinicsLoading}
      isDoctorsLoading={props.isDoctorsLoading}
      onChangeDoctor={RootPageService.setCurrentDoctor}
      onChangeClinic={RootPageService.setCurrentClinic}
    />
  );
};

let mapStateToProps = (state: RootState) => {
  let currentClinicId = getCurrentClinicId(state);
  return {
    currentClinicId: currentClinicId,
    currentDoctorId: getCurrentDoctorId(state),
    isClinicsLoading: ClinicMetadataSelectors.isLoading(state),
    isDoctorsLoading: DoctorMetadataSelectors.isLoading(state),
    clinics: ClinicSelectors.getClinicsArray(state),
    doctors: DoctorSelectors.getDoctorsArray(state),
  };
};

export const CalendarFilters = connect(mapStateToProps)(Component);

const getDoctorsOptions = (props: CalendarFiltersProps) => {
  let currentDoctorOption;
  let doctors = DoctorModel.fromArray(props.doctors);
  doctors = doctors.filter(doctor => {
    let doctorsClinic = doctor.getClinic();
    return doctorsClinic
      ? doctorsClinic.getId() === props.currentClinicId
      : false;
  });
  let doctorOptions = doctors.map(doctor => {
    let option = {
      label: doctor.getName(),
      value: doctor.getId(),
    };
    if (doctor.getId() === props.currentDoctorId) {
      currentDoctorOption = option;
    }
    return option;
  });
  return { currentDoctorOption, doctorOptions };
};

const getClinicsOptions = (props: CalendarFiltersProps) => {
  let currentClinicOption;
  let clinics = ClinicModel.fromArray(props.clinics);
  let clinicOptions = clinics.map(clinic => {
    let option = {
      label: clinic.getName(),
      value: clinic.getId(),
    };
    if (clinic.getId() === props.currentClinicId) {
      currentClinicOption = option;
    }
    return option;
  });
  return { currentClinicOption, clinicOptions };
};
