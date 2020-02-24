import { all, delay, put, select, takeLatest } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import * as Selectors from './selectors';
import { Actions as CaretActions } from '../caret';

export function* gameCycleSaga() {
  const running = yield select(Selectors.isRunning);
  if (running) {
    yield put(Actions.stopAppAction());
    return;
  }
  yield put(Actions.appStartedAction());
  yield put(CaretActions.resetAction());
  while(true) {
    yield put(CaretActions.updateAction());
    yield delay(100);
  }
}

export default function* watchApp() {
  yield all([
    takeLatest(ActionTypes.APP_START, gameCycleSaga),
  ]);
}
