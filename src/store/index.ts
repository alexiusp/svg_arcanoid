import { combineReducers } from 'redux';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all, call, spawn } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import * as AppFeature from '../app';
import * as CaretFeature from '../caret';
import * as BallsFeature from '../balls';
import * as BricksFeature from '../bricks';

const reducer = combineReducers({
  [AppFeature.statePropName]: AppFeature.reducer,
  [CaretFeature.statePropName]: CaretFeature.reducer,
  [BallsFeature.statePropName]: BallsFeature.reducer,
  [BricksFeature.statePropName]: BricksFeature.reducer,
});
type Actions =
  | AppFeature.ActionTypes.IActions
  | CaretFeature.ActionTypes.IActions
  | BallsFeature.ActionTypes.IActions
  | BricksFeature.ActionTypes.IActions;

export type RootState = ReturnType<typeof reducer>;
export type RootStore = Store<RootState, Actions>;

export function* rootSaga() {
  const sagas = [AppFeature.Saga, CaretFeature.Saga, BallsFeature.Saga, BricksFeature.Saga];
  yield all(
    sagas.map((saga) =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
          } catch (error) {
            yield call(console.log, error.message);
          }
        }
      })
    )
  );
}

export default function getStore(): RootStore {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
}
