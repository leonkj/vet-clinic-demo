export enum CLIENT_METADATA_ACTION_TYPES {
  SET_IS_LOADING = '[Client Metadata] Set is loading',
}

export const setIsLoading = (isloading: boolean) => {
  return {
    type: CLIENT_METADATA_ACTION_TYPES.SET_IS_LOADING,
    payload: isloading,
  };
};
