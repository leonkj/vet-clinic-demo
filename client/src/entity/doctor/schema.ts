import { schema } from 'normalizr';
import { clinicSchema } from '../clinic/schema';

export const doctorSchema = new schema.Entity('doctor', {
  clinic: clinicSchema,
});
export const arrayOfDoctorsSchema = new schema.Array(doctorSchema);
