import { schema } from 'normalizr';
import { clinicSchema } from '../clinic/schema';
import { doctorSchema } from '../doctor/schema';
import { arrayOfServicesSchema } from '../service/schema';
import { clientSchema } from '../client/schema';

export const appointmentSchema = new schema.Entity('appointment', {
  clinic: clinicSchema,
  client: clientSchema,
  doctor: doctorSchema,
  services: arrayOfServicesSchema,
});
export const arrayOfAppointmentsSchema = new schema.Array(appointmentSchema);
