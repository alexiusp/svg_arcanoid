import * as React from 'react';

import styles from './Hexagon.module.css';
import { IPosition } from '../types';
import useRotation from './useAnimation';
import { getRandomInt, round3d } from './utils';

export interface IHexagonProps {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed?: number;
}

function generateHexagonCorners(x: number, y: number, radius: number, rotation: number) {
  const corners: IPosition[] = [];
  for (let index = 0; index < 6; index++) {
    const angleDeg = 60 * index - 30 + rotation;
    const angleRad = Math.PI / 180 * angleDeg;
    corners.push({
      x: round3d(x + radius * Math.cos(angleRad)),
      y: round3d(y + radius * Math.sin(angleRad)),
    });
  }
  return corners;
}

const Hexagon: React.FC<IHexagonProps> = ({ color, radius, speed = 0.1, x, y }) => {
  const rotation = useRotation(getRandomInt(360), speed);
  const corners = generateHexagonCorners(x, y, radius, rotation);
  const points = corners.map(c => `${c.x},${c.y}`).join(' ');
  return (
    <polygon fill={color} className={styles.hexagon} points={points} />
  );
};

export default Hexagon;
