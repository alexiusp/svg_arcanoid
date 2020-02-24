import { ActionCreator } from 'redux';

import * as ActionTypes from './actionTypes';

export const startAppAction: ActionCreator<ActionTypes.IAppStartAction> = () => {
  return {
    type: ActionTypes.APP_START,
  };
};

export const appStartedAction: ActionCreator<ActionTypes.IAppStartedAction> = () => {
  return {
    type: ActionTypes.APP_STARTED,
  };
};

export const stopAppAction: ActionCreator<ActionTypes.IAppStopAction> = () => {
  return {
    type: ActionTypes.APP_STOP,
  };
};
