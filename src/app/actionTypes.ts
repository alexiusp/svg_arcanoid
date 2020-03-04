import { Action } from 'redux';

export const APP_START = 'APP_START';
export type APP_START = typeof APP_START;
export interface IAppStartAction extends Action<APP_START> {
  type: APP_START;
}

export const APP_STARTED = 'APP_STARTED';
export type APP_STARTED = typeof APP_STARTED;
export interface IAppStartedAction extends Action<APP_STARTED> {
  type: APP_STARTED;
}

export const APP_STOP = 'APP_STOP';
export type APP_STOP = typeof APP_STOP;
export interface IAppStopAction extends Action<APP_STOP> {
  type: APP_STOP;
}

export const APP_SCORES_INCREMENT = 'APP_SCORES_INCREMENT';
export type APP_SCORES_INCREMENT = typeof APP_SCORES_INCREMENT;
export interface IIncrementScoresAction extends Action<APP_SCORES_INCREMENT> {
  type: APP_SCORES_INCREMENT;
  amount: number;
}

export const APP_GAME_OVER = 'APP_GAME_OVER';
export type APP_GAME_OVER = typeof APP_GAME_OVER;
export interface IGameOverAction extends Action<APP_GAME_OVER> {
  type: APP_GAME_OVER;
}

export const APP_HISCORE = 'APP_HISCORE';
export type APP_HISCORE = typeof APP_HISCORE;
export interface IHiscoreAction extends Action<APP_HISCORE> {
  type: APP_HISCORE;
  hiscores: number[];
  position: number;
}

export const APP_MESSAGE = 'APP_MESSAGE';
export type APP_MESSAGE = typeof APP_MESSAGE;
export interface IMessageAction extends Action<APP_MESSAGE> {
  type: APP_MESSAGE;
  message: string;
}

export const APP_MESSAGE_CLEAR = 'APP_MESSAGE_CLEAR';
export type APP_MESSAGE_CLEAR = typeof APP_MESSAGE_CLEAR;
export interface IClearMessageAction extends Action<APP_MESSAGE_CLEAR> {
  type: APP_MESSAGE_CLEAR;
}

export type IActions =
  | IAppStartAction
  | IAppStartedAction
  | IAppStopAction
  | IIncrementScoresAction
  | IGameOverAction
  | IHiscoreAction
  | IMessageAction
  | IClearMessageAction;
