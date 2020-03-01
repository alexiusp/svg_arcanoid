import { ActionCreator } from 'redux';

import * as ActionTypes from './actionTypes';

export const moveLeftAction: ActionCreator<ActionTypes.ICaretLeftAction> = () => ({
  type: ActionTypes.CARET_LEFT,
});

export const moveRightAction: ActionCreator<ActionTypes.ICaretRightAction> = () => ({
  type: ActionTypes.CARET_RIGHT,
});

export const stopCaretAction: ActionCreator<ActionTypes.ICaretStopAction> = () => ({
  type: ActionTypes.CARET_STOP,
});

export const updateSpeedAction: ActionCreator<ActionTypes.IUpdateSpeedAction> = (speed: number) => ({
  type: ActionTypes.CARET_SPEED,
  speed,
});

export const updatePositionAction: ActionCreator<ActionTypes.IUpdatePositionAction> = (x: number) => ({
  type: ActionTypes.CARET_POSITION,
  x,
});

export const updateAction: ActionCreator<ActionTypes.ICaretUpdateAction> = () => ({
  type: ActionTypes.CARET_UPDATE,
});

export const resetAction: ActionCreator<ActionTypes.ICaretResetAction> = () => ({
  type: ActionTypes.CARET_RESET,
});
