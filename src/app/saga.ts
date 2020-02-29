import { all, cancel, delay, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import * as Selectors from './selectors';
import { Actions as CaretActions } from '../caret';
import { Actions as BallsActions } from '../balls';
import { Actions as BricksActions } from '../bricks';

const GAME_TICK = 100;

function* kickBallSaga() {
  // wait one tick
  yield delay(GAME_TICK);
  yield put(BallsActions.kickBallAction(0));
}

function* gameCycleSaga() {
  while(true) {
    // update caret position
    yield put(CaretActions.updateAction());
    yield put(BallsActions.updateAction());
    yield delay(GAME_TICK);
  }
}

function* startGameSaga() {
  const running = yield select(Selectors.isRunning);
  if (running) {
    yield put(Actions.stopAppAction());
    return;
  }
  yield put(Actions.appStartedAction());
  // initialize first bricks level
  yield put(BricksActions.initBricksAction(1));
  // reset caret position and speed
  yield put(CaretActions.resetAction());
  // clean up balls
  yield put(BallsActions.resetBallsAction());
  // add one initial ball
  yield put(BallsActions.initBallAction());
  // kick ball
  yield fork(kickBallSaga);
  // start cycle
  const gameCycle = yield fork(gameCycleSaga);
  yield take(ActionTypes.APP_STOP);
  yield cancel(gameCycle);
}

export default function* watchApp() {
  yield all([
    takeLatest(ActionTypes.APP_START, startGameSaga),
  ]);
}
