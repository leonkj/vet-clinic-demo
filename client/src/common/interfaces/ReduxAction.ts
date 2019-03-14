export interface ReduxAction<ActionTypes> {
  type: ActionTypes;
  payload: any;
}
