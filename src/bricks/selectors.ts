import { statePropName, IFeatureState } from './reducer';

export interface IState {
  // this feature state
  [statePropName]: IFeatureState;
  // other features we don't care of
  [otherKeys: string]: any;
}

const getFeatureState = (state: IState) => state[statePropName];

export const getLevel = (state: IState) => getFeatureState(state).level;

export const getBricks = (state: IState) => getFeatureState(state).bricks;

// const getAmountOfBricks = (state: IState) => getBricks(state).length;

export const getBrick = (state: IState, index: number) => getBricks(state)[index];

export const findNeighborIndex = (state: IState, x: number, y: number) => {
  const bricks = getBricks(state);
  return bricks.findIndex((b) => (!!b && b.x === x && b.y === y));
}
