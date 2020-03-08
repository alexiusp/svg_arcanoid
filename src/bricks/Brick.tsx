import * as React from 'react';

import styles from './Brick.module.css';
import { IBrickModel, EBrickType } from './types';

const Brick: React.FC<IBrickModel> = ({ x, y, height, width, color, type }) => {
  const deadClass = type === EBrickType.Dead ? styles.dead : '';
  const colorClass = styles[color];
  const classNames = `${styles.brick} ${colorClass} ${deadClass}`;
  return (
    <rect className={classNames} x={x+1} y={y+1} rx={6} ry={6} width={width-2} height={height-2} />
  );
}
export default Brick;
