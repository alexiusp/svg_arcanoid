import { ActionCreator } from 'redux';

import * as ActionTypes from './actionTypes';

export const moveLeftAction: ActionCreator<ActionTypes.ICaretLeftAction> = () => {
  return {
    type: ActionTypes.CARET_LEFT,
  };
};

export const moveRightAction: ActionCreator<ActionTypes.ICaretRightAction> = () => {
  return {
    type: ActionTypes.CARET_RIGHT,
  };
};

export const updateAction: ActionCreator<ActionTypes.ICaretUpdateAction> = () => {
  return {
    type: ActionTypes.CARET_UPDATE,
  };
};

export const resetAction: ActionCreator<ActionTypes.ICaretResetAction> = () => {
  return {
    type: ActionTypes.CARET_RESET,
  };
};
