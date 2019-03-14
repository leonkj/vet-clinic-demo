export enum SERVICE_METADATA_ACTION_TYPES {
  SET_IS_LOADING = '[Service Metadata] Set is loading',
}

export const setIsLoading = (isloading: boolean) => {
  return {
    type: SERVICE_METADATA_ACTION_TYPES.SET_IS_LOADING,
    payload: isloading,
  };
};
