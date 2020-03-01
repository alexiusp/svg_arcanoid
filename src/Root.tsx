import React from 'react';
import { connect } from 'react-redux';

import './Root.css';
import { Actions, Selectors, ScoresLayer } from './app';
import { VIEW_WIDTH, VIEW_HEIGHT } from './constants';
import { RootState } from './store';

import { Caret } from './caret';
import { BallsLayer } from './balls';
import { BricksLayer } from './bricks';

export interface IRootProps {
  running: boolean;
  onStart: () => void;
}

export const Root: React.FC<IRootProps> = ({ running, onStart }) => {
  const startHandler = () => onStart();
  return (
    <div className="root">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}>
        <BricksLayer />
        <BallsLayer />
        <Caret />
        <ScoresLayer />
      </svg>
      <button onClick={startHandler}>{ running ? 'Stop' : 'Start' }</button>
    </div>
  );
}

export const mapStateToProps = (state: RootState) => {
  const running = Selectors.isRunning(state);
  return {
    running,
  };
};

export const mapDispatchToProps = {
  onStart: Actions.startAppAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(Root);
