import { statePropName, IFeatureState } from './reducer';

export interface IState {
  // this feature state
  [statePropName]: IFeatureState;
  // other features we don't care of
  [otherKeys: string]: any;
}

const getFeatureState = (state: IState) => state[statePropName];

export const getBalls = (state: IState) => getFeatureState(state).balls;

export const getAmountOfBalls = (state: IState) => getBalls(state).length;

export const getBall = (state: IState, index: number) => getBalls(state)[index];

export const getFirstInactiveBallIndex = (state: IState) => getBalls(state).findIndex(ball => (ball.vx === 0 && ball.vy === 0));
