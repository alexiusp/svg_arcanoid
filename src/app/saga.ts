import { all, cancel, delay, fork, put, race, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

import { Actions as BallsActions } from '../balls';
import { Actions as BricksActions, ActionTypes as BricksActionTypes } from '../bricks';
import { Actions as CaretActions } from '../caret';
import { STATE_STORE_KEY } from '../constants';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';
import * as Selectors from './selectors';

const GAME_TICK = 100;

export function getDelta(timestamp: number) {
  return Date.now() - timestamp;
}

function* gameCycleSaga() {
  while (true) {
    // update bricks state
    yield put(BricksActions.updateBricksAction());
    // update caret position
    yield put(CaretActions.updateAction());
    // update balls position
    yield put(BallsActions.updateAction());
    yield delay(GAME_TICK);
  }
}

function* startGameSaga() {
  // initialize first bricks level
  yield put(BricksActions.initBricksAction(1));
  // reset caret position and speed
  yield put(CaretActions.resetAction());
  // clean up balls
  yield put(BallsActions.resetBallsAction());
  // add one initial ball
  yield put(BallsActions.initBallAction());
  yield put(Actions.appStartedAction());
  // show message
  yield put(Actions.messageAction('Get ready!'));
  const { timeout } = yield race({
    timeout: delay(2000),
    close: take(ActionTypes.APP_MESSAGE_CLEAR),
  });
  if (timeout) {
    yield put(Actions.clearMessageAction());
  }
  // start cycle
  const gameCycle = yield fork(gameCycleSaga);
  yield take(ActionTypes.APP_GAME_OVER);
  yield cancel(gameCycle);
  yield put(Actions.messageAction('Game Over!'));
  yield take(ActionTypes.APP_MESSAGE_CLEAR);
  yield fork(calculateHiScores);
}

function* calculateHiScores() {
  const score = yield select(Selectors.getScores);
  const hiscores: number[] = yield select(Selectors.getHiscores);
  let scoresList: number[] = [...hiscores];
  let playerPos = 0;
  if (hiscores.length > 0) {
    const hiscoreIndex = hiscores.findIndex((hiscore) => score > hiscore);
    if (hiscoreIndex > -1) {
      scoresList = [...hiscores.slice(0, hiscoreIndex), score, ...hiscores.slice(hiscoreIndex)];
      playerPos = hiscoreIndex + 1;
    }
  } else {
    playerPos = 1;
    scoresList = [score];
  }
  yield put(Actions.hiscoreAction(scoresList, playerPos));
}

function* scoreBrickHitSaga() {
  yield put(Actions.incrementScoresAction(1));
}

function* stopAndSaveStateSaga() {
  // initialize first bricks level
  yield put(BricksActions.initBricksAction(1));
  // reset caret position and speed
  yield put(CaretActions.resetAction());
  // clean up balls
  yield put(BallsActions.resetBallsAction());
  yield delay(GAME_TICK);
  const stateToSave = yield select(Selectors.getStateToSave);
  yield localStorage.setItem(STATE_STORE_KEY, stateToSave);
}

export default function* watchApp() {
  yield all([
    takeLatest(ActionTypes.APP_START, startGameSaga),
    takeEvery(BricksActionTypes.BRICK_HIT, scoreBrickHitSaga),
    takeEvery(ActionTypes.APP_STOP, stopAndSaveStateSaga),
  ]);
}
