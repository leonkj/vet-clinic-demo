export enum DOCTOR_METADATA_ACTION_TYPES {
  SET_IS_LOADING = '[Doctor Metadata] Set is loading',
}

export const setIsLoading = (isloading: boolean) => {
  return {
    type: DOCTOR_METADATA_ACTION_TYPES.SET_IS_LOADING,
    payload: isloading,
  };
};
