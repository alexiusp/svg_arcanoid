import * as React from 'react';

interface IBallProps {
  x: number;
  y: number;
  r: number;
}

const Ball: React.FC<IBallProps> = ({ r, x, y }) => {
  return (
    <circle cx={x} cy={y} r={r} />
  );
}
export default Ball;
