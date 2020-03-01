import * as ActionTypes from './actionTypes';

export interface IFeatureState {
  running: boolean;
  scores: number;
}

export const initialState: IFeatureState = {
  running: false,
  scores: 0,
};

export const statePropName = 'app';

export default function appReducer(
  state: IFeatureState = initialState,
  action: ActionTypes.IActions
): IFeatureState {
  switch (action.type) {
    case ActionTypes.APP_STARTED:
      return {
        ...state,
        running: true,
        scores: 0,
      };
    case ActionTypes.APP_STOP:
      return {
        ...state,
        running: false
      };
    case ActionTypes.APP_SCORES_INCREMENT: {
      return {
        ...state,
        scores: state.scores + action.amount,
      };
    }
    default:
      return state;
  }
}
