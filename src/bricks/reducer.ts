import * as ActionTypes from './actionTypes';
import { IBrickModel } from './types';

export interface IFeatureState {
  bricks: (IBrickModel | null)[];
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
    case ActionTypes.BRICK_UPDATE: {
      const { index, brick } = action;
      const bricks = [
        ...state.bricks.slice(0, index),
        brick,
        ...state.bricks.slice(index + 1),
      ];
      return {
        ...state,
        bricks,
      };
    }
    case ActionTypes.BRICK_REMOVE: {
      const index = action.index;
      const bricks = [
        ...state.bricks.slice(0, index),
        null,
        ...state.bricks.slice(index + 1),
      ];
      return {
        ...state,
        bricks,
      };
    }
    default:
      return state;
  }
}
