import * as ActionTypes from './actionTypes';
import { IBrickModel } from './types';

export interface IFeatureState {
  bricks: IBrickModel[];
  level: number;
}

export const initialState: IFeatureState = {
  bricks: [],
  level: 0,
};

export const statePropName = 'bricks';

export default function reducer(
  state: IFeatureState = initialState,
  action: ActionTypes.IActions
): IFeatureState {
  switch (action.type) {
    case ActionTypes.BRICKS_INIT: {
      const level = action.level;
      return {
        ...state,
        bricks: [],
        level,
      };
    }
    case ActionTypes.BRICK_ADD: {
      const bricks = [...state.bricks, action.brick];
      return {
        ...state,
        bricks,
      };
    }
    case ActionTypes.BRICK_HIT: {
      const index = action.index;
      const bricks = [...state.bricks];
      const brick = bricks[index];
      brick.health -= 1;
      if (brick.health < 1) {
        bricks.splice(index, 1);
      } else {
        bricks[index] = brick;
      }
      return {
        ...state,
        bricks,
      }
    }
    default:
      return state;
  }
}
