import { schema } from 'normalizr';

export const serviceSchema = new schema.Entity('service');
export const arrayOfServicesSchema = new schema.Array(serviceSchema);
