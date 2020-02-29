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

export const getAmountOfBricks = (state: IState) => getBricks(state).length;

export const getBrick = (state: IState, index: number) => getBricks(state)[index];
