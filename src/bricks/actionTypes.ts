import { Action } from 'redux';
import { IBrickModel } from './types';

export const BRICKS_INIT = 'BRICKS_INIT';
export type BRICKS_INIT = typeof BRICKS_INIT;
export interface IInitBricksAction extends Action<BRICKS_INIT> {
  type: BRICKS_INIT;
  level: number;
}

export const BRICK_ADD = 'BRICK_ADD';
export type BRICK_ADD = typeof BRICK_ADD;
export interface IAddBrickAction extends Action<BRICK_ADD> {
  type: BRICK_ADD;
  brick: IBrickModel;
}

export const BRICK_HIT = 'BRICK_HIT';
export type BRICK_HIT = typeof BRICK_HIT;
export interface IHitBrickAction extends Action<BRICK_HIT> {
  type: BRICK_HIT;
  index: number;
}

export const BRICK_UPDATE = 'BRICK_UPDATE';
export type BRICK_UPDATE = typeof BRICK_UPDATE;
export interface IUpdateBrickAction extends Action<BRICK_UPDATE> {
  type: BRICK_UPDATE;
  index: number;
  brick: IBrickModel;
}

export const BRICK_REMOVE = 'BRICK_REMOVE';
export type BRICK_REMOVE = typeof BRICK_REMOVE;
export interface IRemoveBrickAction extends Action<BRICK_REMOVE> {
  type: BRICK_REMOVE;
  index: number;
}

export type IActions = IInitBricksAction | IAddBrickAction | IHitBrickAction | IUpdateBrickAction | IRemoveBrickAction;
