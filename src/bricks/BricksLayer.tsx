import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../store';
import Brick from './Brick';
import * as Selectors from './selectors';
import { IBrickModel } from './types';

export interface IBricksLayerProps {
  bricks: IBrickModel[];
}

const BricksLayer: React.FC<IBricksLayerProps> = ({ bricks }) => {
  return (
    <>
      {bricks.map((brick, index) => (
        <Brick key={index} {...brick} />
      ))}
    </>
  );
}

export const mapStateToProps = (state: RootState) => {
  const bricks = Selectors.getBricks(state);
  return {
    bricks,
  };
}

export default connect(mapStateToProps)(BricksLayer);
