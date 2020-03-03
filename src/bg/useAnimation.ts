import * as React from 'react';

const MAX_DEG = 360;

const limit = (num: number) => num > MAX_DEG ? num - MAX_DEG : num;

export default function useRotation(initialAngle: number, increment: number = 1) {
  const [angle, setAngle] = React.useState(limit(initialAngle));
  React.useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setAngle(limit(angle + increment));
    });
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [angle, setAngle, increment]);
  return angle;
}
