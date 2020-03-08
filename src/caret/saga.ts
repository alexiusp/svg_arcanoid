import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import * as Selectors from './selectors';
import { VIEW_WIDTH } from '../constants';

// max speed caret can have
const MAX_SPEED = 10;
// real coordinates caret speed multiplier
const SPEED_STEP = 6;
// acceleration multiplier
const ACCELERATION = 4;
// deceleration multiplier
const DECELERATION = 4;

function* changeSpeedSaga(delta: number) {
  const oldSpeed = yield select(Selectors.getSpeed);
  // apply acceleration/deceleration multipliers
  const newSpeed = (oldSpeed * delta < 0) ? oldSpeed + delta * DECELERATION : oldSpeed + delta * ACCELERATION;
  const speed =
  newSpeed < 0
      ? Math.max(newSpeed, -MAX_SPEED)
      : Math.min(newSpeed, MAX_SPEED);
  return speed;
}

function* moveCaretLeftSaga() {
  const speed = yield call(changeSpeedSaga, -1);
  yield put(Actions.updateSpeedAction(speed));
}

function* moveCaretRightSaga() {
  const speed = yield call(changeSpeedSaga, 1);
  yield put(Actions.updateSpeedAction(speed));
}

function* stopCaretSaga() {
  yield put(Actions.updateSpeedAction(0));
}

function* updateCaretSaga() {
  const oldXPos = yield select(Selectors.getXPos);
  let speed = yield select(Selectors.getSpeed);
  const caretWidth = yield select(Selectors.getWidth);
  let x = oldXPos + speed * SPEED_STEP;
  // detect wall collisions
  if (x < 0 || x > VIEW_WIDTH - caretWidth) {
    x = Math.max(0, Math.min(x, VIEW_WIDTH - caretWidth));
    speed = 0;
    yield put(Actions.updateSpeedAction(speed));
  }
  if (x !== oldXPos) {
    // only update if position changes
    yield put(Actions.updatePositionAction(x));
  }
}

export default function* watchCaret() {
  yield all([
    takeLatest(ActionTypes.CARET_LEFT, moveCaretLeftSaga),
    takeLatest(ActionTypes.CARET_RIGHT, moveCaretRightSaga),
    takeLatest(ActionTypes.CARET_STOP, stopCaretSaga),
    takeLatest(ActionTypes.CARET_UPDATE, updateCaretSaga),
  ]);
}
