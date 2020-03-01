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
