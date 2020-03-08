import { all, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

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
// starting ball speed
const START_BALL_SPEED = 24;
// collision impulse transfer ratio
const IMPULSE_RATIO = 0.5;

function* getBallStickyToCaret() {
  // calculate ball position on top right corner of the caret
  const caretX = yield select(CaretSelectors.getXPos);
  const caretY = yield select(CaretSelectors.getYPos);
  const caretWidth = yield select(CaretSelectors.getWidth);
  const caretRight = caretX + caretWidth;
  const x = caretRight - DEFAULT_BALL_RADIUS * 2;
  const y = caretY - DEFAULT_BALL_RADIUS;
  const r = DEFAULT_BALL_RADIUS;
  const ball: IBallModel = { x, y, r, vx: 0, vy: 0 };
  return ball;
}

function* initBallSaga() {
  const ball = yield call(getBallStickyToCaret);
  yield put(Actions.addBallAction(ball));
}

function lengthSqr(x1: number, y1: number, x2: number, y2: number) {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}

enum ERectPosition {
  Inside,
  LeftTop,
  Left,
  LeftBottom,
  Bottom,
  RightBottom,
  Right,
  RightTop,
  Top,
}

/**
 * returns 'sector' of space where the ball is relative to given rect
 * @param ball ball which position being calculated
 * @param rect reactangular relative to which position is being calculated
 * @returns ERectPosition
 */
function getRectPosition(ball: IBallModel, rect: IRect) {
  const isLeft = ball.x <= rect.x;
  const isRight = ball.x >= rect.x + rect.width;
  const isTop = ball.y <= rect.y;
  const isBottom = ball.y >= rect.y + rect.height;
  if (isLeft && isTop) {
    // left-top corner
    return ERectPosition.LeftTop;
  } else if (isLeft && isBottom) {
    // left-bottom corner
    return ERectPosition.LeftBottom;
  } else if (isLeft) {
    // left side
    return ERectPosition.Left;
  } else if (isRight && isBottom) {
    // right-bottom corner
    return ERectPosition.RightBottom;
  } else if (isBottom) {
    // bottom side
    return ERectPosition.Bottom;
  } else if (isRight && isTop) {
    // right-top corner
    return ERectPosition.RightTop;
  } else if (isRight) {
    // right side
    return ERectPosition.Right;
  } else if (isTop) {
    // top side
    return ERectPosition.Top;
  }
  return ERectPosition.Inside;
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
  const sector = getRectPosition(ball, rect);
  let collide: boolean;
  switch (sector) {
    case ERectPosition.LeftTop: {
      collide = lengthSqr(ball.x, ball.y, rect.x, rect.y) <= Math.pow(ball.r, 2);
      return collide ? ERectCollision.LeftTop : ERectCollision.None;
    }
    case ERectPosition.LeftBottom: {
      collide = lengthSqr(ball.x, ball.y, rect.x, rect.y + rect.height) <= Math.pow(ball.r, 2);
      return collide ? ERectCollision.LeftBottom : ERectCollision.None;
    }
    case ERectPosition.Left: {
      collide = rect.x - ball.x <= ball.r;
      return collide ? ERectCollision.Left : ERectCollision.None;
    }
    case ERectPosition.RightBottom: {
      collide = lengthSqr(ball.x, ball.y, rect.x + rect.width, rect.y + rect.height) <= Math.pow(ball.r, 2);
      return collide ? ERectCollision.RightBottom : ERectCollision.None;
    }
    case ERectPosition.Bottom: {
      collide = ball.y - (rect.y + rect.height) <= ball.r;
      return collide ? ERectCollision.Bottom : ERectCollision.None;
    }
    case ERectPosition.RightTop: {
      collide = lengthSqr(ball.x, ball.y, rect.x + rect.width, rect.y) <= Math.pow(ball.r, 2);
      return collide ? ERectCollision.RightTop : ERectCollision.None;
    }
    case ERectPosition.Right: {
      collide = ball.x - (rect.x + rect.width) <= ball.r;
      return collide ? ERectCollision.Right : ERectCollision.None;
    }
    case ERectPosition.Top: {
      collide = rect.y - ball.y <= ball.r;
      return collide ? ERectCollision.Top : ERectCollision.None;
    }
    default:
      break;
  }
  // inside
  return ERectCollision.Inside;
}

function* updateBallsSaga() {
  const balls: IBallModel[] = yield select(Selectors.getBalls);
  for (let index = 0; index < balls.length; index++) {
    const ball = balls[index];
    let newBall: IBallModel;
    if (ball.vx === 0 && ball.vy === 0) {
      // if ball is sticky to caret - calculate position and continue loop
      newBall = yield call(getBallStickyToCaret);
      yield put(Actions.updateBallAction(index, newBall));
      continue;
    }
    // if not sticky - calculate new ball position
    newBall = {
      ...ball,
      x: ball.x + ball.vx,
      y: ball.y + ball.vy,
    };
    // check for collision with bricks
    // TODO: optimise check by reducing set of bricks under test
    const bricks: (IRect | null)[] = yield select(BricksSelectors.getBricks);
    let brickCollision = ERectCollision.None;
    for (let brickIndex = 0; brickIndex < bricks.length; brickIndex++) {
      const brick = bricks[brickIndex];
      if (!brick) {
        continue;
      }
      brickCollision = getCollision(newBall, brick);
      if (brickCollision === ERectCollision.None) {
        // no collision - skip calculations
        continue;
      }
      yield put(BricksActions.hitBrickAction(brickIndex));
      switch (brickCollision) {
        case ERectCollision.Bottom:
          newBall.y = brick.y + brick.height + newBall.r;
          newBall.vy = -newBall.vy;
          break;
        case ERectCollision.Top:
          newBall.y = brick.y - newBall.r;
          newBall.vy = -newBall.vy;
          break;
        case ERectCollision.Right:
          newBall.x = brick.x + brick.width + newBall.r;
          newBall.vx = -newBall.vx;
          break;
        case ERectCollision.Left:
          newBall.x = brick.x - newBall.r;
          newBall.vx = -newBall.vx;
          break;
        case ERectCollision.LeftBottom:
        case ERectCollision.LeftTop:
        case ERectCollision.RightBottom:
        case ERectCollision.RightTop:
          newBall.vy = -newBall.vy;
          newBall.vx = -newBall.vx;
          break;
        case ERectCollision.Inside: {
          // if inside collision detected - try to detect real collision
          // by calculating the position of the ball in the middle of movement
          const posX = Math.trunc(ball.x + ball.vx / 2);
          const posY = Math.trunc(ball.y + ball.vy / 2);
          const middleBall: IBallModel = {
            ...ball,
            x: posX,
            y: posY,
          };
          const position = getRectPosition(middleBall, brick);
          switch (position) {
            case ERectPosition.Inside:
            case ERectPosition.LeftBottom:
            case ERectPosition.LeftTop:
            case ERectPosition.RightBottom:
            case ERectPosition.RightTop:
              newBall.vy = -newBall.vy;
              newBall.vx = -newBall.vx;
              break;
            case ERectPosition.Bottom:
              newBall.y = brick.y + brick.height + newBall.r;
              newBall.vy = -newBall.vy;
              break;
            case ERectPosition.Top:
              newBall.y = brick.y - newBall.r;
              newBall.vy = -newBall.vy;
              break;
            case ERectPosition.Right:
              newBall.x = brick.x + brick.width + newBall.r;
              newBall.vx = -newBall.vx;
              break;
            case ERectPosition.Left:
              newBall.x = brick.x - newBall.r;
              newBall.vx = -newBall.vx;
              break;
          }
          break;
        }
      }
      break;
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

function* kickBallSaga() {
  const index = yield select(Selectors.getFirstInactiveBallIndex);
  if (index < 0) {
    return;
  }
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
  yield put(Actions.removeBallAction(index));
  if (amount === 1) {
    yield put(AppActions.gameOverAction());
  }
}

export default function* watchBalls() {
  yield all([
    takeLatest(ActionTypes.BALL_INIT, initBallSaga),
    takeLatest(ActionTypes.BALLS_UPDATE, updateBallsSaga),
    takeLatest(ActionTypes.BALL_KICK, kickBallSaga),
    takeEvery(ActionTypes.BALL_HIT_FLOOR, handleFloorCollision),
  ]);
}
