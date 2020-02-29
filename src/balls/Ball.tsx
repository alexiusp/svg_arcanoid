import * as React from 'react';

import styles from './Ball.module.css';

interface IBallProps {
  x: number;
  y: number;
  r: number;
}

const Ball: React.FC<IBallProps> = ({ r, x, y }) => {
  return (
    <circle className={styles.ball} cx={x} cy={y} r={r} />
  );
}
export default Ball;
