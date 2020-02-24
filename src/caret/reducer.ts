import * as ActionTypes from './actionTypes';
import CaretModel from './CaretModel';

export interface IFeatureState {
  speed: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const initialState: IFeatureState = {
  speed: 0,
  x: CaretModel.x,
  y: CaretModel.y,
  width: CaretModel.width,
  height: CaretModel.height,
};

export const statePropName = 'caret';

export default function reducer(
  state: IFeatureState = initialState,
  action: ActionTypes.IActions
): IFeatureState {
  switch (action.type) {
    case ActionTypes.CARET_LEFT: {
      return {
        ...state,
        speed: CaretModel.moveLeft(),
      };
    }
    case ActionTypes.CARET_RIGHT: {
      return {
        ...state,
        speed: CaretModel.moveRight(),
      };
    }
    case ActionTypes.CARET_UPDATE: {
      return {
        ...state,
        x: CaretModel.updateX(),
      };
    }
    case ActionTypes.CARET_RESET: {
      CaretModel.reset();
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
