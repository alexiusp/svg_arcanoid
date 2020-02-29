import { all, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import { Selectors as CaretSelectors } from '../caret';
import { VIEW_WIDTH, VIEW_HEIGHT } from '../constants';
import { Actions as AppActions } from '../app';
import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import * as Selectors from './selectors';
import { IBallModel } from './types';
import { ICaretModel } from '../caret/types';

const DEFAULT_BALL_RADIUS = 10;
// real coordinates ball speed multiplier
const SPEED_STEP = 5;
// starting ball speed
const START_BALL_SPEED = 3;
// collision impulse transfer ratio
const IMPULSE_RATIO = 0.5;

function* initBallSaga() {
  // calculate default ball position on top right corner of the caret
  const caretX = yield select(CaretSelectors.getXPos);
  const caretY = yield select(CaretSelectors.getYPos);
  const caretWidth = yield select(CaretSelectors.getWidth);
  const caretRight = caretX + caretWidth;
  const x = caretRight - DEFAULT_BALL_RADIUS * 2;
  const y = caretY - DEFAULT_BALL_RADIUS;
  const r = DEFAULT_BALL_RADIUS;
  const ball = { x, y, r, vx: 0, vy: 0 } as IBallModel;
  yield put(Actions.addBallAction(ball));
}

function lengthSqr(x1: number, y1: number, x2: number, y2: number) {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}

function* detectCollision(x: number, y: number, r: number) {
  // detect if ball collide with caret
  const caret: ICaretModel = yield select(CaretSelectors.getCaretModel);
  const isLeft = x <= caret.x;
  const isRight = x >= caret.x + caret.width;
  const isTop = y <= caret.y;
  const isBottom = y >= caret.y + caret.height;
  if (isLeft && isTop) {
    // left-top corner
    return lengthSqr(x, y, caret.x, caret.y) <= Math.pow(r, 2);
  } else if (isLeft && isBottom) {
    // left-bottom corner
    return lengthSqr(x, y, caret.x, caret.y + caret.height) <= Math.pow(r, 2);
  } else if (isLeft) {
    // left side
    return caret.x - x <= r;
  } else if (isRight && isBottom) {
    // right-bottom corner
    return lengthSqr(x, y, caret.x + caret.width, caret.y + caret.height) <= Math.pow(r, 2);
  } else if (isBottom) {
    // bottom side
    return y - caret.y + caret.height <= r;
  } else if (isRight && isTop) {
    // right-top corner
    return lengthSqr(x, y, caret.x + caret.width, caret.y) <= Math.pow(r, 2);
  } else if (isRight) {
    // right side
    return x - caret.x + caret.width <= r;
  } else if (isTop) {
    // top side
    return caret.y - y <= r;
  }
  // inside
  return true;
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
    // TODO: resolve objects collisions
    const collideWithCaret = yield call(detectCollision, posX, posY, ball.r);
    if (collideWithCaret) {
      const caret: ICaretModel = yield select(CaretSelectors.getCaretModel);
      // does not matter wich side of caret collide
      newVY = -newVY;
      newVX += caret.speed * IMPULSE_RATIO;
    } else {
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
    }
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
  const vx = START_BALL_SPEED + caretSpeed;
  const vy = -START_BALL_SPEED;
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
