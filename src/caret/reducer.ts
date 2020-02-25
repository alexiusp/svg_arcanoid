import * as ActionTypes from './actionTypes';
import { VIEW_WIDTH, VIEW_HEIGHT } from '../constants';

export interface IFeatureState {
  speed: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const caretWidth = 120;
const caretHeight = 20;
const caretPosX = (VIEW_WIDTH - caretWidth) / 2;
const caretPosY = VIEW_HEIGHT - caretHeight;

export const initialState: IFeatureState = {
  speed: 0,
  x: caretPosX,
  y: caretPosY,
  width: caretWidth,
  height: caretHeight,
};

export const statePropName = 'caret';

export default function reducer(
  state: IFeatureState = initialState,
  action: ActionTypes.IActions
): IFeatureState {
  switch (action.type) {
    case ActionTypes.CARET_POSITION: {
      const x = action.x;
      return {
        ...state,
        x,
      };
    }
    case ActionTypes.CARET_SPEED: {
      const speed = action.speed;
      return {
        ...state,
        speed,
      };
    }
    case ActionTypes.CARET_RESET: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
