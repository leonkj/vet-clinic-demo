import { combineReducers } from 'redux';
import { clinicsReducer } from './entity/clinic/reducer';
import { ClinicsState } from './entity/clinic/interfaces';
import { DoctorsState } from './entity/doctor/interfaces';
import { doctorsReducer } from './entity/doctor/reducer';
import { appointmentsReducer } from './entity/appointment/reducer';
import { AppointmentsState } from './entity/appointment/interfaces';
import { rootPageReducer, RootPageState } from './pages/root/reducer';
import { metadataReducer, MetadataState } from './entity/metadata/reducer';
import { clientsReducer } from './entity/client/reducer';
import { ClientsState } from './entity/client/interface';
import { servicesReducer } from './entity/service/reducer';
import { ServicesState } from './entity/service/interfaces';
import { modalReducer, ModalState } from './components/modal/reducer';

const uiReducer = combineReducers({
  rootPage: rootPageReducer,
  modal: modalReducer,
});

const dbReducer = combineReducers({
  clinics: clinicsReducer,
  clients: clientsReducer,
  doctors: doctorsReducer,
  appointments: appointmentsReducer,
  services: servicesReducer,
  metadata: metadataReducer,
});

export interface RootState {
  ui: {
    rootPage: RootPageState;
    modal: ModalState;
  };
  db: {
    clinics: ClinicsState;
    clients: ClientsState;
    doctors: DoctorsState;
    appointments: AppointmentsState;
    services: ServicesState;
    metadata: MetadataState;
  };
}

export default combineReducers({
  ui: uiReducer,
  db: dbReducer,
});
