import { statePropName, IFeatureState } from './reducer';

export interface IState {
  // this feature state
  [statePropName]: IFeatureState;
  // other features we don't care of
  [otherKeys: string]: any;
}

const getAppState = (state: IState) => state[statePropName];

export const isRunning = (state: IState) => getAppState(state).running;

export const getScores = (state: IState) => getAppState(state).scores;

export const isGameOver = (state: IState) => getAppState(state).gameOver;

export const getHiscores = (state: IState) => getAppState(state).hiscores;

export const getPlayerPosition = (state: IState) => getAppState(state).position;

export const getStateToSave = (state: IState) => JSON.stringify(state);
