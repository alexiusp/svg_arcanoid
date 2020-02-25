import { all, delay, fork, put, select, takeLatest } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import * as Selectors from './selectors';
import { Actions as CaretActions } from '../caret';
import { Actions as BallsActions } from '../balls';

const GAME_TICK = 100;

function* kickBallSaga() {
  // wait one tick
  // yield delay(GAME_TICK);
  yield put(BallsActions.kickBallAction(0));
}

function* gameCycleSaga() {
  const running = yield select(Selectors.isRunning);
  if (running) {
    yield put(Actions.stopAppAction());
    return;
  }
  yield put(Actions.appStartedAction());
  yield put(CaretActions.resetAction());
  yield put(BallsActions.initBallAction());
  yield fork(kickBallSaga);
  while(true) {
    // update caret position
    yield delay(GAME_TICK);
    yield put(CaretActions.updateAction());
    yield put(BallsActions.updateAction());
  }
}

export default function* watchApp() {
  yield all([
    takeLatest(ActionTypes.APP_START, gameCycleSaga),
  ]);
}
