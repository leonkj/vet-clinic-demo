import { schema } from 'normalizr';
import { clinicSchema } from '../clinic/schema';

export const clientSchema = new schema.Entity('client', {
  clinic: clinicSchema,
});
export const arrayOfClientsSchema = new schema.Array(clientSchema);
