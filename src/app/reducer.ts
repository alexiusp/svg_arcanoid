import * as ActionTypes from './actionTypes';

export interface IFeatureState {
  running: boolean;
}

export const initialState: IFeatureState = {
  running: false,
};

export const statePropName = 'app';

export default function appReducer(state: IFeatureState = initialState, action: ActionTypes.IActions): IFeatureState {
  switch (action.type) {
    case ActionTypes.APP_STARTED:
      return {
        ...initialState,
        running: true,
      };
      case ActionTypes.APP_STOP:
        return {
          ...initialState,
          running: false,
        };
      default:
      return state;
  }
}
