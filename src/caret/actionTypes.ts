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
  | ICaretUpdateAction
  | ICaretResetAction;
