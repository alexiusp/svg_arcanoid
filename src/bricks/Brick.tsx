import * as React from 'react';

import styles from './Brick.module.css';
import { IBrickModel } from './types';

const Brick: React.FC<IBrickModel> = ({ x, y, health, height, width }) => {
  const classNames = `${styles.brick} ${styles[`brick-${health}`]}`;
  return (
    <rect className={classNames} x={x+1} y={y+1} rx={6} ry={6} width={width-2} height={height-2} />
  );
}
export default Brick;
