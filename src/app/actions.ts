import { ActionCreator } from 'redux';

import * as ActionTypes from './actionTypes';

export const startAppAction: ActionCreator<ActionTypes.IAppStartAction> = () => ({
  type: ActionTypes.APP_START,
});

export const appStartedAction: ActionCreator<ActionTypes.IAppStartedAction> = () => ({
  type: ActionTypes.APP_STARTED,
});

export const stopAppAction: ActionCreator<ActionTypes.IAppStopAction> = () => ({
  type: ActionTypes.APP_STOP,
});

export const incrementScoresAction: ActionCreator<ActionTypes.IIncrementScoresAction> = (amount: number) => ({
  type: ActionTypes.APP_SCORES_INCREMENT,
  amount,
});

export const gameOverAction: ActionCreator<ActionTypes.IGameOverAction> = () => ({
  type: ActionTypes.APP_GAME_OVER,
});

export const hiscoreAction: ActionCreator<ActionTypes.IHiscoreAction> = (hiscores: number[], position: number) => ({
  type: ActionTypes.APP_HISCORE,
  hiscores,
  position,
});

export const messageAction: ActionCreator<ActionTypes.IMessageAction> = (message: string) => ({
  type: ActionTypes.APP_MESSAGE,
  message,
});

export const clearMessageAction: ActionCreator<ActionTypes.IClearMessageAction> = () => ({
  type: ActionTypes.APP_MESSAGE_CLEAR,
});
