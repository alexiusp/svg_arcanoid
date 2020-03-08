import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../store';
import Brick from './Brick';
import * as Selectors from './selectors';
import { IBrickModel } from './types';

export interface IBricksLayerProps {
  bricks: (IBrickModel | null)[];
}

const BricksLayer: React.FC<IBricksLayerProps> = ({ bricks }) => {
  return <g>{bricks.map((brick, index) => brick && <Brick key={index} {...brick} />)}</g>;
};

export const mapStateToProps = (state: RootState) => {
  const bricks = Selectors.getBricks(state);
  return {
    bricks,
  };
};

export default connect(mapStateToProps)(BricksLayer);
