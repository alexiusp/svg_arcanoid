import { Action } from 'redux';

export const CARET_LEFT = 'CARET_LEFT';
export type CARET_LEFT = typeof CARET_LEFT;
export interface ICaretLeftAction extends Action<CARET_LEFT> {
  type: CARET_LEFT;
}

export const CARET_RIGHT = 'CARET_RIGHT';
export type CARET_RIGHT = typeof CARET_RIGHT;
export interface ICaretRightAction extends Action<CARET_RIGHT> {
  type: CARET_RIGHT;
}

export const CARET_STOP = 'CARET_STOP';
export type CARET_STOP = typeof CARET_STOP;
export interface ICaretStopAction extends Action<CARET_STOP> {
  type: CARET_STOP;
}

export const CARET_SPEED = 'CARET_SPEED';
export type CARET_SPEED = typeof CARET_SPEED;
export interface IUpdateSpeedAction extends Action<CARET_SPEED> {
  type: CARET_SPEED;
  speed: number;
}

export const CARET_POSITION = 'CARET_POSITION';
export type CARET_POSITION = typeof CARET_POSITION;
export interface IUpdatePositionAction extends Action<CARET_POSITION> {
  type: CARET_POSITION;
  x: number;
}

export const CARET_UPDATE = 'CARET_UPDATE';
export type CARET_UPDATE = typeof CARET_UPDATE;
export interface ICaretUpdateAction extends Action<CARET_UPDATE> {
  type: CARET_UPDATE;
}

export const CARET_RESET = 'CARET_RESET';
export type CARET_RESET = typeof CARET_RESET;
export interface ICaretResetAction extends Action<CARET_RESET> {
  type: CARET_RESET;
}

export type IActions =
  | ICaretLeftAction
  | ICaretRightAction
  | IUpdateSpeedAction
  | IUpdatePositionAction
  | ICaretUpdateAction
  | ICaretResetAction;
