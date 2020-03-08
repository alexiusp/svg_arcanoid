import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import buildBrick from './bricksFactory';
import { BRICK_WIDTH, BRICK_HEIGHT, BRICKS_TOP_MARGIN } from './constants';
import * as Selectors from './selectors';
import { IBrickModel, EBrickType } from './types';

const level0 = [
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 3, 1, 4, 4, 1, 3, 1, 1],
  [1, 2, 5, 2, 3, 3, 2, 5, 2, 1],
  [0, 1, 1, 1, 5, 5, 1, 1, 1, 0],
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

function* updateBrick(index: number, brick: IBrickModel) {
  if (brick.health < 0) {
    yield put(Actions.removeBrickAction(index));
  } else {
    yield put(Actions.updateBrickAction(index, brick));
  }
}

function* handleBrickHitSaga({ index }: ActionTypes.IHitBrickAction) {
  const brick: IBrickModel | null = yield select(Selectors.getBrick, index);
  yield console.log('brick hit', index, brick);
  if (!brick) {
    return;
  }
  // decrease health
  const updatedBrick: IBrickModel = {
    ...brick,
    health: brick.health - 1,
  };
  // do type related transformations
  switch (updatedBrick.type) {
    case EBrickType.Quadruple:
      updatedBrick.type = EBrickType.Triple;
      updatedBrick.color = 'triple';
      break;
    case EBrickType.Triple:
      updatedBrick.type = EBrickType.Double;
      updatedBrick.color = 'double';
      break;
    case EBrickType.Double:
      updatedBrick.type = EBrickType.Single;
      updatedBrick.color = 'single';
      break;
    case EBrickType.Dynamite: {
      // explode
      const {x, y, width, height} = brick;
      // hit left
      let neighbor = yield select(Selectors.findNeighborIndex, x - width, y);
      if (neighbor >= 0) {
        yield put(Actions.hitBrickAction(neighbor));
      }
      // hit right
      neighbor = yield select(Selectors.findNeighborIndex, x + width, y);
      if (neighbor >= 0) {
        yield put(Actions.hitBrickAction(neighbor));
      }
      // hit top
      neighbor = yield select(Selectors.findNeighborIndex, x, y - height);
      if (neighbor >= 0) {
        yield put(Actions.hitBrickAction(neighbor));
      }
      // hit bottom
      neighbor = yield select(Selectors.findNeighborIndex, x, y + height);
      if (neighbor >= 0) {
        yield put(Actions.hitBrickAction(neighbor));
      }
      break;
    }
    default:
      break;
  }
  yield call(updateBrick, index, updatedBrick);
}

function* updateBricksSaga() {
  const bricks: (IBrickModel | null)[] = yield select(Selectors.getBricks);
  for (let index = 0; index < bricks.length; index++) {
    const brick = bricks[index];
    // if there is no brick or brick is still alive - skip
    if (!brick || brick.health > 0) {
      continue;
    }
    let updatedBrick = {
      ...brick,
    };
    // if brick is just got destroyed - apply animation state
    // TODO: make animation state a standalone property instead of type monkeypatching
    if (brick.type !== EBrickType.Dead) {
      updatedBrick.type = EBrickType.Dead;
      updatedBrick.health -= 1;
      yield put(Actions.updateBrickAction(index, updatedBrick));
      continue;
    }
    // remove brick if it was animated
    yield put(Actions.removeBrickAction(index));
  }
}

export default function* featureSaga() {
  yield all([
    takeEvery(ActionTypes.BRICKS_INIT, initBricksSaga),
    takeEvery(ActionTypes.BRICK_HIT, handleBrickHitSaga),
    takeLatest(ActionTypes.BRICKS_UPDATE, updateBricksSaga),
  ]);
}
