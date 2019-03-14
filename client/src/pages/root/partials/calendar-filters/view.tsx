import { Select, SelectOption } from '../../../../components/select';
import React from 'react';
import './styles.scss';

interface CalendarFiltersViewProps {
  clinicOptions: SelectOption[];
  doctorOptions: SelectOption[];
  currentClinicOption: SelectOption | undefined;
  currentDoctorOption: SelectOption | undefined;
  onChangeDoctor: (newDoctorId: any) => void;
  onChangeClinic: (newClinicId: any) => void;
  isClinicsLoading: boolean;
  isDoctorsLoading: boolean;
}

const BASE_CLASS = 'c-calendar-filters';
const SELECT_CLASS = BASE_CLASS + '__select';

export const CalendarFiltersView = (props: CalendarFiltersViewProps) => (
  <div className={BASE_CLASS}>
    <div>
      <Select
        onChange={props.onChangeClinic}
        placeholder="Clinics"
        isLoading={props.isClinicsLoading}
        isClearable={true}
        value={props.currentClinicOption}
        className={SELECT_CLASS}
        options={props.clinicOptions}
      />
    </div>
    <div>
      <Select
        key={
          props.currentDoctorOption ? props.currentDoctorOption.value : 'empty'
        }
        onChange={props.onChangeDoctor}
        placeholder="Doctors"
        isLoading={props.isDoctorsLoading}
        isClearable={true}
        value={props.currentDoctorOption}
        className={SELECT_CLASS}
        options={props.doctorOptions}
      />
    </div>
  </div>
);
