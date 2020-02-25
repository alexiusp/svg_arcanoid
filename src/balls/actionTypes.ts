import { Action } from 'redux';
import { IBallModel } from './types';

export const BALL_INIT = 'BALL_INIT';
export type BALL_INIT = typeof BALL_INIT;
export interface IInitBallAction extends Action<BALL_INIT> {
  type: BALL_INIT;
}

export const BALL_ADD = 'BALL_ADD';
export type BALL_ADD = typeof BALL_ADD;
export interface IAddBallAction extends Action<BALL_ADD> {
  type: BALL_ADD;
  ball: IBallModel;
}

export const BALL_UPDATE = 'BALL_UPDATE';
export type BALL_UPDATE = typeof BALL_UPDATE;
export interface IUpdateBallAction extends Action<BALL_UPDATE> {
  type: BALL_UPDATE;
  index: number;
  ball: IBallModel;
}

export const BALLS_UPDATE = 'BALLS_UPDATE';
export type BALLS_UPDATE = typeof BALLS_UPDATE;
export interface IUpdateAllBallsAction extends Action<BALLS_UPDATE> {
  type: BALLS_UPDATE;
}

export const BALL_KICK = 'BALL_KICK';
export type BALL_KICK = typeof BALL_KICK;
export interface IKickBallAction extends Action<BALL_KICK> {
  type: BALL_KICK;
  index: number;
}

export type IActions =
  | IInitBallAction
  | IAddBallAction
  | IUpdateBallAction
  | IUpdateAllBallsAction
  | IKickBallAction;
