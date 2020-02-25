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

export const kickBallAction: ActionCreator<ActionTypes.IKickBallAction> = (index: number) => ({
  type: ActionTypes.BALL_KICK,
  index,
});
