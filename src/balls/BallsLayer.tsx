import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../store';
import Ball from './Ball';
import * as Selectors from './selectors';
import { IBallModel } from './types';

export interface IBallsLayerProps {
  balls: IBallModel[];
}

const BallsLayer: React.FC<IBallsLayerProps> = ({ balls }) => {
  return (
    <g>
      {balls.map((ball, index) => (
        <Ball key={index} {...ball} />
      ))}
    </g>
  );
}

export const mapStateToProps = (state: RootState) => {
  const balls = Selectors.getBalls(state);
  return {
    balls,
  };
}

export default connect(mapStateToProps)(BallsLayer);
