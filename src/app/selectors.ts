import { statePropName, IFeatureState } from './reducer';

export interface IState {
  // this feature state
  [statePropName]: IFeatureState;
  // other features we don't care of
  [otherKeys: string]: any;
}

const getAppState = (state: IState) => state[statePropName];

export const isRunning = (state: IState) => getAppState(state).running;
