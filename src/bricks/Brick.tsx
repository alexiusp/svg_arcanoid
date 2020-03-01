import * as React from 'react';

import styles from './Brick.module.css';
import { IBrickModel } from './types';

const Brick: React.FC<IBrickModel> = ({ x, y, health, height, width }) => {
  const classNames = `${styles.brick} ${styles[`brick-${health}`]}`;
  return (
    <rect className={classNames} x={x} y={y} rx={6} ry={6} width={width} height={height} />
  );
}
export default Brick;
