import { schema } from 'normalizr';

export const clinicSchema = new schema.Entity('clinic');
export const arrayOfClinicsSchema = new schema.Array(clinicSchema);
