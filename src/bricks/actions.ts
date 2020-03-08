import { ActionCreator } from 'redux';

import * as ActionTypes from './actionTypes';
import { IBrickModel } from './types';

export const initBricksAction: ActionCreator<ActionTypes.IInitBricksAction> = (level: number) => ({
  type: ActionTypes.BRICKS_INIT,
  level,
});

export const addBrickAction: ActionCreator<ActionTypes.IAddBrickAction> = (brick: IBrickModel) => ({
  type: ActionTypes.BRICK_ADD,
  brick,
});

export const hitBrickAction: ActionCreator<ActionTypes.IHitBrickAction> = (index: number) => ({
  type: ActionTypes.BRICK_HIT,
  index,
});

/**
 * updates brick model in state
 * @param index brick index
 * @param brick brick model to update
 */
export const updateBrickAction: ActionCreator<ActionTypes.IUpdateBrickAction> = (index: number, brick: IBrickModel) => ({
  type: ActionTypes.BRICK_UPDATE,
  index,
  brick,
});

/**
 * removes brick from state
 * @param index index of the brick to remove
 */
export const removeBrickAction: ActionCreator<ActionTypes.IRemoveBrickAction> = (index: number) => ({
  type: ActionTypes.BRICK_REMOVE,
  index,
});

/**
 * calls function to update bricks animation state
 */
export const updateBricksAction: ActionCreator<ActionTypes.IUpdateBricksAction> = () => ({
  type: ActionTypes.BRICKS_UPDATE,
});
