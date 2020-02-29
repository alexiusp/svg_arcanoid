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
