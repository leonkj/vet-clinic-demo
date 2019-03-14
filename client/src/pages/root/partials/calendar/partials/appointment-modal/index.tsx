import * as React from 'react';
import { Modal } from '../../../../../../components/modal';
import ModalService from '../../../../../../components/modal/service';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useCallback, useState } from 'react';
import moment from 'moment';
import './styles.scss';
import { connect } from 'react-redux';
import * as ClinicSelectors from '../../../../../../entity/clinic/selectors';
import * as DoctorSelectors from '../../../../../../entity/doctor/selectors';
import * as ClientSelectors from '../../../../../../entity/client/selectors';
import * as ServiceSelectors from '../../../../../../entity/service/selectors';
import { RootState } from '../../../../../../reducer';
import { iDoctor } from '../../../../../../entity/doctor/interfaces';
import { iClinic } from '../../../../../../entity/clinic/interfaces';
import { ClinicModel } from '../../../../../../entity/clinic/model';
import { RootPageService } from '../../../../service';
import { DoctorModel } from '../../../../../../entity/doctor/model';
import { ClientModel } from '../../../../../../entity/client/model';
import { iClient } from '../../../../../../entity/client/interface';
import { iService } from '../../../../../../entity/service/interfaces';
import { ServiceModel } from '../../../../../../entity/service/model';
import { AppointmentService } from '../../../../../../entity/appointment/service';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm';

export enum AppointmentsModalType {
  CREATE,
  EDIT,
}

type ComponentProps = {
  startDate: Date;
  endDate: Date;
  doctorId?: string;
  clinicId?: string;
  clientId?: string;
  appointmentId?: string;
  selectedServices?: string[];
  doctors: iDoctor[];
  clinics: iClinic[];
  clients: iClient[];
  services: iService[];
  type: AppointmentsModalType;
};

type FormErrors = {
  doctor?: string | undefined;
  client?: string | undefined;
  clinic?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  services?: string | undefined;
};

const Component = (props: ComponentProps) => {
  let isEdit = props.type === AppointmentsModalType.EDIT;

  let [startDate, setStartDate] = useState(props.startDate);
  let [endDate, setEndDate] = useState(props.endDate);
  let [clinicId, setClinicId] = useState(props.clinicId);
  let [doctorId, setDoctorId] = useState(props.doctorId);
  let [clientId, setClientId] = useState(props.clientId);
  let [services, setServices] = useState<string[]>(
    props.selectedServices || []
  );
  let [formErrors, setFormErrors] = useState<FormErrors>({});
  let [hasServerError, setHasServerError] = useState(false);
  let handleClinicChange = useCallback(event => {
    let clinicId = event.target.value;
    setClinicId(clinicId);
    if (!clinicId) {
      setDoctorId(undefined);
    }
    RootPageService.setCurrentClinic(clinicId);
  }, []);
  let handleDoctorChange = useCallback(event => {
    let doctorId = event.target.value;
    setDoctorId(doctorId);
    RootPageService.setCurrentDoctor(doctorId);
  }, []);

  let doctors = props.doctors.filter(doctor => {
    let wrappedDoctor = new DoctorModel(doctor);
    if (clinicId) {
      return wrappedDoctor.getClinicId() === clinicId;
    }
    return false;
  });
  let clients = props.clients.filter(client => {
    let wrappedClient = new ClientModel(client);
    if (clinicId) {
      return wrappedClient.getClinicId() === clinicId;
    }
    return false;
  });

  let submitHandler = async () => {
    let { isValid, errors } = validateForm({
      services,
      endDate,
      startDate,
      clinicId,
      clientId,
      doctorId,
      isEdit,
    });
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    try {
      setHasServerError(false);
      if (props.type === AppointmentsModalType.CREATE) {
        await AppointmentService.createAndUpdateDb({
          doctorId: doctorId || '',
          clinicId: clinicId || '',
          clientId: clientId || '',
          start: startDate,
          stop: endDate,
          services,
        });
      }
      if (props.type === AppointmentsModalType.EDIT) {
        await AppointmentService.editAndUpdateDb({
          start: startDate,
          stop: endDate,
          id: props.appointmentId || '',
        });
      }
      ModalService.closeModal();
    } catch (error) {
      setHasServerError(true);
    }
  };

  let actions = [
    <Button
      variant="contained"
      color="primary"
      key="save"
      onClick={submitHandler}
    >
      Save
    </Button>,
    <Button variant="contained" onClick={ModalService.closeModal} key="close">
      Close
    </Button>,
  ];
  return (
    <Modal
      id="appointments-modal"
      fullWidth={true}
      maxWidth={'md'}
      title={isEdit ? 'Edit appointment' : 'Create appointment'}
      actions={actions}
    >
      <div className="c-appointment-modal">
        {hasServerError && (
          <p className="u-error">Server: Failed to save appointment</p>
        )}
        <div className="u-pb-15px">
          <FormControl error={!!formErrors.startDate}>
            <TextField
              onChange={event => {
                setStartDate(moment(event.target.value).toDate());
              }}
              id="start-date"
              label="Start date"
              type="datetime-local"
              defaultValue={startDate && moment(startDate).format(DATE_FORMAT)}
            />
          </FormControl>
          <FormControl error={!!formErrors.endDate}>
            <TextField
              onChange={event => {
                setEndDate(moment(event.target.value).toDate());
              }}
              id="end-date"
              label="End date"
              type="datetime-local"
              defaultValue={endDate && moment(endDate).format(DATE_FORMAT)}
            />
          </FormControl>
        </div>
        <div className="u-pb-15px">
          <FormControl error={!!formErrors.clinic} fullWidth disabled={isEdit}>
            <InputLabel htmlFor="appointment-clinic">Clinic</InputLabel>
            <Select
              onChange={handleClinicChange}
              value={clinicId}
              fullWidth
              inputProps={{
                id: 'appointment-clinic',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {props.clinics.map(clinic => {
                let wrappedClinic = new ClinicModel(clinic);
                return (
                  <MenuItem
                    key={wrappedClinic.getId()}
                    value={wrappedClinic.getId()}
                  >
                    {wrappedClinic.getName()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="u-pb-15px">
          <FormControl error={!!formErrors.doctor} fullWidth disabled={isEdit}>
            <InputLabel htmlFor="appointment-doctor">Doctor</InputLabel>
            <Select
              onChange={handleDoctorChange}
              value={doctorId}
              fullWidth
              inputProps={{
                id: 'appointment-doctor',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {doctors.map(doctor => {
                let wrappedDoctor = new DoctorModel(doctor);
                return (
                  <MenuItem
                    key={wrappedDoctor.getId()}
                    value={wrappedDoctor.getId()}
                  >
                    {wrappedDoctor.getName()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="u-pb-15px">
          <FormControl error={!!formErrors.client} fullWidth disabled={isEdit}>
            <InputLabel htmlFor="appointment-client">Client</InputLabel>
            <Select
              fullWidth
              onChange={event => setClientId(event.target.value)}
              value={clientId}
              inputProps={{
                id: 'appointment-client',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {clients.map(client => {
                let wrappedClient = new ClientModel(client);
                return (
                  <MenuItem
                    key={wrappedClient.getId()}
                    value={wrappedClient.getId()}
                  >
                    {wrappedClient.getName()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="u-pb-15px">
          <FormControl
            error={!!formErrors.services}
            fullWidth
            disabled={isEdit}
          >
            <InputLabel htmlFor="appointment-services">Services</InputLabel>
            <Select
              fullWidth
              onChange={event => {
                if (Array.isArray(event.target.value)) {
                  setServices(event.target.value);
                }
              }}
              inputProps={{
                id: 'appointment-services',
              }}
              multiple
              value={services}
            >
              {props.services.map(service => {
                let wrappedService = new ServiceModel(service);
                return (
                  <MenuItem
                    key={wrappedService.getId()}
                    value={wrappedService.getId()}
                  >
                    {wrappedService.getName()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    </Modal>
  );
};
const mapStateToProps = (state: RootState) => ({
  clinics: ClinicSelectors.getClinicsArray(state),
  doctors: DoctorSelectors.getDoctorsArray(state),
  clients: ClientSelectors.getClientsArray(state),
  services: ServiceSelectors.getServicesArray(state),
});

export const AppointmentModal = connect(mapStateToProps)(Component);

const validateForm = ({
  doctorId,
  clientId,
  clinicId,
  startDate,
  endDate,
  services,
  isEdit,
}: {
  doctorId: string | undefined;
  clientId: string | undefined;
  clinicId: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  services: string[] | undefined;
  isEdit: boolean;
}) => {
  let errors: FormErrors = {
    doctor: undefined,
    client: undefined,
    clinic: undefined,
    startDate: undefined,
    endDate: undefined,
    services: undefined,
  };
  let hasError = false;
  if (!doctorId && !isEdit) {
    hasError = true;
    errors.doctor = 'Required';
  }
  if (!clientId && !isEdit) {
    hasError = true;
    errors.client = 'Required';
  }
  if (!clinicId && !isEdit) {
    hasError = true;
    errors.clinic = 'Required';
  }
  if (!startDate) {
    hasError = true;
    errors.startDate = 'Required';
  }
  if (!endDate) {
    hasError = true;
    errors.endDate = 'Required';
  }
  if ((!services || services.length === 0) && !isEdit) {
    hasError = true;
    errors.services = 'Required';
  }

  return { isValid: !hasError, errors };
};
