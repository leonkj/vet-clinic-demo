export enum CLINIC_METADATA_ACTION_TYPES {
  SET_IS_LOADING = '[Clinic Metadata] Set is loading',
}

export const setIsLoading = (isloading: boolean) => {
  return {
    type: CLINIC_METADATA_ACTION_TYPES.SET_IS_LOADING,
    payload: isloading,
  };
};
