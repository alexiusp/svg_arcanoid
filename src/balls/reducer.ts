import * as ActionTypes from './actionTypes';
import { IBallModel } from './types';

export interface IFeatureState {
  balls: IBallModel[];
}

export const initialState: IFeatureState = {
  balls: [],
};

export const statePropName = 'balls';

export default function reducer(
  state: IFeatureState = initialState,
  action: ActionTypes.IActions
): IFeatureState {
  switch (action.type) {
    case ActionTypes.BALL_ADD: {
      const balls = [...state.balls, action.ball];
      return {
        ...state,
        balls,
      };
    }
    case ActionTypes.BALL_UPDATE: {
      const { index, ball } = action;
      const balls = [...state.balls];
      balls[index] = ball;
      return {
        ...state,
        balls,
      };
    }
    case ActionTypes.BALL_REMOVE: {
      const index = action.index;
      const balls = [...state.balls];
      balls.splice(index, 1);
      return {
        ...state,
        balls,
      };
    }
    default:
      return state;
  }
}
