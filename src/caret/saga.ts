import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import * as Selectors from './selectors';
import { VIEW_WIDTH } from '../constants';

const MAX_SPEED = 7;
const SPEED_STEP = 5;

function* changeSpeedSaga(delta: number) {
  const oldSpeed = yield select(Selectors.getSpeed);
  const newSpeed = oldSpeed + delta;
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
  yield put(Actions.updatePositionAction(x));
}

export default function* watchCaret() {
  yield all([
    takeLatest(ActionTypes.CARET_LEFT, moveCaretLeftSaga),
    takeLatest(ActionTypes.CARET_RIGHT, moveCaretRightSaga),
    takeLatest(ActionTypes.CARET_UPDATE, updateCaretSaga),
  ]);
}
