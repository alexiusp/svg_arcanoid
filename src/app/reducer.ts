import * as ActionTypes from './actionTypes';

export interface IFeatureState {
  running: boolean;
  scores: number;
  hiscores: number[];
  gameOver: boolean;
  position: number;
}

export const initialState: IFeatureState = {
  running: false,
  scores: 0,
  hiscores: [],
  gameOver: false,
  position: 0,
};

export const statePropName = 'app';

export default function appReducer(state: IFeatureState = initialState, action: ActionTypes.IActions): IFeatureState {
  switch (action.type) {
    case ActionTypes.APP_STARTED:
      return {
        ...state,
        running: true,
      };
    case ActionTypes.APP_STOP:
      return {
        ...state,
        scores: 0,
        running: false,
        gameOver: false,
      };
    case ActionTypes.APP_SCORES_INCREMENT: {
      return {
        ...state,
        scores: state.scores + action.amount,
      };
    }
    case ActionTypes.APP_HISCORE: {
      const { hiscores, position } = action;
      return {
        ...state,
        gameOver: true,
        hiscores,
        position,
      };
    }
    default:
      return state;
  }
}
