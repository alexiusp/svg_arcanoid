import * as React from 'react';
import { connect } from 'react-redux';

import * as Selectors from './selectors';

export interface ICaretProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Caret: React.FC<ICaretProps> = ({ x, y, width, height }) => {
  return (
    <rect x={x} y={y} width={width} height={height} />
  );
}

export const mapStateToProps = Selectors.getCaretModel;

export default connect(mapStateToProps)(Caret);
