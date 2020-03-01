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
}

export const BALL_HIT_FLOOR = 'BALL_HIT_FLOOR';
export type BALL_HIT_FLOOR = typeof BALL_HIT_FLOOR;
export interface IBallHitFloorAction extends Action<BALL_HIT_FLOOR> {
  type: BALL_HIT_FLOOR;
  index: number;
}

export const BALL_REMOVE = 'BALL_REMOVE';
export type BALL_REMOVE = typeof BALL_REMOVE;
export interface IRemoveBallAction extends Action<BALL_REMOVE> {
  type: BALL_REMOVE;
  index: number;
}

export const BALLS_RESET = 'BALLS_RESET';
export type BALLS_RESET = typeof BALLS_RESET;
export interface IResetBallsAction extends Action<BALLS_RESET> {
  type: BALLS_RESET;
}

export type IActions =
  | IInitBallAction
  | IAddBallAction
  | IUpdateBallAction
  | IUpdateAllBallsAction
  | IKickBallAction
  | IBallHitFloorAction
  | IRemoveBallAction
  | IResetBallsAction;
