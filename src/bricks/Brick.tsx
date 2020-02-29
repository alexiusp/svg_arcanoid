import * as React from 'react';

import styles from './Brick.module.css';
import { IBrickModel } from './types';

const Brick: React.FC<IBrickModel> = ({ x, y, health, height, width }) => {
  return (
    <rect className={styles[`brick-${health}`]} x={x} y={y} width={width} height={height} />
  );
}
export default Brick;
