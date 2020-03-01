import { all, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import { ICaretModel } from '../caret/types';
import { IRect } from '../types';
import { Actions as AppActions } from '../app';
import { Actions as BricksActions, Selectors as BricksSelectors } from '../bricks';
import { Selectors as CaretSelectors } from '../caret';
import { VIEW_WIDTH, VIEW_HEIGHT } from '../constants';
import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import * as Selectors from './selectors';
import { IBallModel } from './types';

const DEFAULT_BALL_RADIUS = 12;
// real coordinates ball speed multiplier
const SPEED_STEP = 6;
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

enum ERectCollision {
  None,
  LeftTop,
  Left,
  LeftBottom,
  Bottom,
  RightBottom,
  Right,
  RightTop,
  Top,
  Inside,
}

function getCollision(ball: IBallModel, rect: IRect) {
  const isLeft = ball.x <= rect.x;
  const isRight = ball.x >= rect.x + rect.width;
  const isTop = ball.y <= rect.y;
  const isBottom = ball.y >= rect.y + rect.height;
  let collide = false;
  if (isLeft && isTop) {
    // left-top corner
    collide = lengthSqr(ball.x, ball.y, rect.x, rect.y) <= Math.pow(ball.r, 2);
    return collide ? ERectCollision.LeftTop : ERectCollision.None;
  } else if (isLeft && isBottom) {
    // left-bottom corner
    collide = lengthSqr(ball.x, ball.y, rect.x, rect.y + rect.height) <= Math.pow(ball.r, 2);
    return collide ? ERectCollision.LeftBottom : ERectCollision.None;
  } else if (isLeft) {
    // left side
    collide = rect.x - ball.x <= ball.r;
    return collide ? ERectCollision.Left : ERectCollision.None;
  } else if (isRight && isBottom) {
    // right-bottom corner
    collide = lengthSqr(ball.x, ball.y, rect.x + rect.width, rect.y + rect.height) <= Math.pow(ball.r, 2);
    return collide ? ERectCollision.RightBottom : ERectCollision.None;
  } else if (isBottom) {
    // bottom side
    collide = ball.y - (rect.y + rect.height) <= ball.r;
    return collide ? ERectCollision.Bottom : ERectCollision.None;
  } else if (isRight && isTop) {
    // right-top corner
    collide = lengthSqr(ball.x, ball.y, rect.x + rect.width, rect.y) <= Math.pow(ball.r, 2);
    return collide ? ERectCollision.RightTop : ERectCollision.None;
  } else if (isRight) {
    // right side
    collide = ball.x - (rect.x + rect.width) <= ball.r;
    return collide ? ERectCollision.Right : ERectCollision.None;
  } else if (isTop) {
    // top side
    collide = rect.y - ball.y <= ball.r;
    return collide ? ERectCollision.Top : ERectCollision.None;
  }
  // inside
  return ERectCollision.Inside;
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
    const newBall: IBallModel = {
      ...ball,
      x: posX,
      y: posY,
      vx: newVX,
      vy: newVY,
    };
    // check for collision with bricks
    // TODO: optimise check by reducing set of bricks under test
    const bricks = yield select(BricksSelectors.getBricks);
    let brickCollision = ERectCollision.None;
    for (let brickIndex = 0; brickIndex < bricks.length; brickIndex++) {
      const brick = bricks[brickIndex];
      brickCollision = getCollision(newBall, brick);
      if (brickCollision !== ERectCollision.None) {
        // collision found - exit loop
        yield put(BricksActions.hitBrickAction(brickIndex));
        break;
      }
    }
    switch (brickCollision) {
      case ERectCollision.Bottom:
      case ERectCollision.Top:
        newBall.vy = -newBall.vy;
        break;
      case ERectCollision.Right:
      case ERectCollision.Left:
        newBall.vx = -newBall.vx;
        break;
      case ERectCollision.LeftBottom:
      case ERectCollision.LeftTop:
      case ERectCollision.RightBottom:
      case ERectCollision.RightTop:
      case ERectCollision.Inside:
        newBall.vy = -newBall.vy;
        newBall.vx = -newBall.vx;
    }
    // check for collision with caret
    const caret: ICaretModel = yield select(CaretSelectors.getCaretModel);
    const caretCollision = getCollision(newBall, caret);
    if (caretCollision !== ERectCollision.None) {
      // does not matter wich side of caret collide
      newBall.y = caret.y - newBall.r;
      newBall.vy = -newBall.vy;
      newBall.vx += caret.speed * IMPULSE_RATIO;
    } else {
      // resolve collisions with edge of the viewport
      // Detect collision with floor.
      if (newBall.y + ball.r > VIEW_HEIGHT) {
        newBall.vx = 0;
        newBall.vy = 0;
        yield put(Actions.ballHitFloorAction(index));
      }
      // Detect collision with right wall.
      else if (newBall.x + ball.r > VIEW_WIDTH) {
        // Need to know how much we overshot the canvas width so we know how far to 'bounce'.
        newBall.x = VIEW_WIDTH - ball.r;
        newBall.vx = -newBall.vx;
      }
      // Detect collision with left wall.
      else if (newBall.x - ball.r < 0) {
        newBall.x = ball.r;
        newBall.vx = -newBall.vx;
      }
      // Detect collision with top wall.
      else if (newBall.y - ball.r < 0) {
        newBall.y = ball.r;
        newBall.vy = -newBall.vy;
      }
    }
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
