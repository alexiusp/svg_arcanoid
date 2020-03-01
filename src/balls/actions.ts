import { ActionCreator } from 'redux';

import * as ActionTypes from './actionTypes';
import { IBallModel } from './types';

export const initBallAction: ActionCreator<ActionTypes.IInitBallAction> = () => ({
  type: ActionTypes.BALL_INIT,
});

export const addBallAction: ActionCreator<ActionTypes.IAddBallAction> = (ball: IBallModel) => ({
  type: ActionTypes.BALL_ADD,
  ball,
});

export const updateBallAction: ActionCreator<ActionTypes.IUpdateBallAction> = (index: number, ball: IBallModel) => ({
  type: ActionTypes.BALL_UPDATE,
  index,
  ball,
});

export const updateAction: ActionCreator<ActionTypes.IUpdateAllBallsAction> = () => ({
    type: ActionTypes.BALLS_UPDATE,
});

export const kickBallAction: ActionCreator<ActionTypes.IKickBallAction> = () => ({
  type: ActionTypes.BALL_KICK,
});

export const ballHitFloorAction: ActionCreator<ActionTypes.IBallHitFloorAction> = (index: number) => ({
  type: ActionTypes.BALL_HIT_FLOOR,
  index,
});

export const removeBallAction: ActionCreator<ActionTypes.IRemoveBallAction> = (index: number) => ({
  type: ActionTypes.BALL_REMOVE,
  index,
});

export const resetBallsAction: ActionCreator<ActionTypes.IResetBallsAction> = () => ({
  type: ActionTypes.BALLS_RESET,
});
