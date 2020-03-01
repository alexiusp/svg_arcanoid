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

export type IActions = IInitBricksAction | IAddBrickAction | IHitBrickAction;
