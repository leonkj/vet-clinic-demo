export enum SERVICE_ACTION_TYPES {
  SET_SERVICES = '[Services] Set services',
}

export const setClinics = (services: any) => {
  return {
    type: SERVICE_ACTION_TYPES.SET_SERVICES,
    payload: services,
  };
};
