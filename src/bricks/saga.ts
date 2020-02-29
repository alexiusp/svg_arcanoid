import { all, call, put, /*select, takeLatest,*/ takeEvery } from 'redux-saga/effects';
// import { VIEW_WIDTH, VIEW_HEIGHT } from '../constants';
import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import { IBrickModel } from './types';
import { BRICK_WIDTH, BRICK_HEIGHT, BRICKS_TOP_MARGIN } from './constants';

const level0 = [
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

function* initBricksSaga({ level }: ActionTypes.IInitBricksAction) {
  yield call(console.log, `load level ${level}`);
  // TODO: implement different levels
  for (let rowIndex = 0; rowIndex < level0.length; rowIndex++) {
    const row = level0[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const health = row[colIndex];
      if (health > 0) {
        const brick: IBrickModel = {
          health,
          x: colIndex * BRICK_WIDTH,
          y: rowIndex * BRICK_HEIGHT + BRICKS_TOP_MARGIN,
          height: BRICK_HEIGHT,
          width: BRICK_WIDTH,
        };
        yield put(Actions.addBrickAction(brick));
      }
    }
  }
}

export default function* featureSaga() {
  yield all([
    takeEvery(ActionTypes.BRICKS_INIT, initBricksSaga),
  ]);
}
