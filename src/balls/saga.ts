import { all, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import { Selectors as CaretSelectors } from '../caret';
import { VIEW_WIDTH, VIEW_HEIGHT } from '../constants';
import { Actions as AppActions } from '../app';
import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import * as Selectors from './selectors';
import { IBallModel } from './types';

const DefaultBallRadius = 10;
const SPEED_STEP = 5;
const StartBallSpeed = 3;

function* initBallSaga() {
  // calculate default ball position on top right corner of the caret
  const caretX = yield select(CaretSelectors.getXPos);
  const caretY = yield select(CaretSelectors.getYPos);
  const caretWidth = yield select(CaretSelectors.getWidth);
  const caretRight = caretX + caretWidth;
  const x = caretRight - DefaultBallRadius * 2;
  const y = caretY - DefaultBallRadius;
  const r = DefaultBallRadius;
  const ball = { x, y, r, vx: 0, vy: 0 } as IBallModel;
  yield put(Actions.addBallAction(ball));
}

function* updateBallsSaga() {
  const balls: IBallModel[] = yield select(Selectors.getBalls);
  for (let index = 0; index < balls.length; index++) {
    const ball = balls[index];
    // calculate new ball position
    let posX = ball.x + ball.vx * SPEED_STEP;
    let posY = ball.y + ball.vy * SPEED_STEP;
    let newVX = ball.vx;
    let newVY = ball.vy;
    // resolve edge collisions
    // Detect collision with floor.
    if (posY + ball.r > VIEW_HEIGHT) {
      newVX = 0;
      newVY = 0;
      yield put(Actions.ballHitFloorAction(index));
    }
    // Detect collision with right wall.
    else if (posX + ball.r > VIEW_WIDTH) {
      // Need to know how much we overshot the canvas width so we know how far to 'bounce'.
      posX = VIEW_WIDTH - ball.r;
      newVX = -newVX;
    }
    // Detect collision with left wall.
    else if (posX - ball.r < 0) {
      posX = ball.r;
      newVX = -newVX;
    }
    // Detect collision with top wall.
    else if (posY - ball.r < 0) {
      posY = ball.r;
      newVY = -newVY;
    }
    // TODO: resolve objects collisions
    const newBall: IBallModel = {
      ...ball,
      x: posX,
      y: posY,
      vx: newVX,
      vy: newVY,
    };
    yield put(Actions.updateBallAction(index, newBall));
  }
}

function* kickBallSaga({ index }: ActionTypes.IKickBallAction) {
  const ball = yield select(Selectors.getBall, index);
  const caretSpeed = yield select(CaretSelectors.getSpeed);
  const vx = StartBallSpeed + caretSpeed;
  const vy = -StartBallSpeed;
  const newBall: IBallModel = {
    ...ball,
    vx,
    vy,
  };
  yield put(Actions.updateBallAction(index, newBall));
}

function* handleFloorCollision({ index }: ActionTypes.IBallHitFloorAction) {
  // if last ball - stop the game
  // TODO: implement proper game over action
  const amount = yield select(Selectors.getAmountOfBalls);
  if (amount === 1) {
    yield put(AppActions.stopAppAction());
  }
  yield put(Actions.removeBallAction(index));
}

export default function* watchBalls() {
  yield all([
    takeLatest(ActionTypes.BALL_INIT, initBallSaga),
    takeLatest(ActionTypes.BALLS_UPDATE, updateBallsSaga),
    takeLatest(ActionTypes.BALL_KICK, kickBallSaga),
    takeEvery(ActionTypes.BALL_HIT_FLOOR, handleFloorCollision),
  ]);
}
