import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import buildBrick from './bricksFactory';
import { BRICK_WIDTH, BRICK_HEIGHT, BRICKS_TOP_MARGIN } from './constants';
import * as Selectors from './selectors';
import { IBrickModel, EBrickType } from './types';

const level0 = [
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 5, 1, 4, 4, 1, 5, 1, 1],
  [1, 2, 2, 2, 3, 3, 2, 2, 2, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

function* initBricksSaga({ level }: ActionTypes.IInitBricksAction) {
  yield call(console.log, `load level ${level}`);
  // TODO: implement different levels
  for (let rowIndex = 0; rowIndex < level0.length; rowIndex++) {
    const row = level0[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const brickType = row[colIndex];
      if (brickType > 0) {
        const x = colIndex * BRICK_WIDTH;
        const y = rowIndex * BRICK_HEIGHT + BRICKS_TOP_MARGIN;
        const brick = buildBrick(brickType, x, y);
        yield put(Actions.addBrickAction(brick));
      }
    }
  }
}

function* handleBrickHitSaga({ index }: ActionTypes.IHitBrickAction) {
  const brick = yield select(Selectors.getBrick, index);
  yield console.log('brick hit', index, brick);
  // decrease health
  const updatedBrick: IBrickModel = {
    ...brick,
    health: brick.health - 1,
  };
  // do type related transformations
  switch (updatedBrick.type) {
    case EBrickType.Dynamite:
      // TODO: make explosion
      break;
    default:
      break;
  }
  if (updatedBrick.health <= 0) {
    yield put(Actions.removeBrickAction(index));
  } else {
    yield put(Actions.updateBrickAction(index, updatedBrick));
  }
}

export default function* featureSaga() {
  yield all([
    takeEvery(ActionTypes.BRICKS_INIT, initBricksSaga),
    takeEvery(ActionTypes.BRICK_HIT, handleBrickHitSaga),
  ]);
}
