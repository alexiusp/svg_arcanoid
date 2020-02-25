import { statePropName, IFeatureState } from './reducer';

export interface IState {
  // this feature state
  [statePropName]: IFeatureState;
  // other features we don't care of
  [otherKeys: string]: any;
}

const getFeatureState = (state: IState) => state[statePropName];

export const getCaretProps = (state: IState) => {
  const caret = getFeatureState(state);
  return {
    x: caret.x,
    y: caret.y,
    width: caret.width,
    height: caret.height,
  };
};

export const getXPos = (state: IState) => getFeatureState(state).x;

export const getYPos = (state: IState) => getFeatureState(state).y;

export const getWidth = (state: IState) => getFeatureState(state).width;

export const getHeight = (state: IState) => getFeatureState(state).height;

export const getSpeed = (state: IState) => getFeatureState(state).speed;
