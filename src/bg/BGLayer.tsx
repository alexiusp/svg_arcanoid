import * as React from 'react';

import { VIEW_WIDTH, VIEW_HEIGHT } from '../constants';
import Hexagon from './Hexagon';
import { getRandomInt } from './utils';

function createHexagons(num: number) {
  return [...new Array(num)].map(() => ({
    x: getRandomInt(VIEW_WIDTH),
    y: getRandomInt(VIEW_HEIGHT),
    radius: 400 + getRandomInt(Math.min(VIEW_WIDTH, VIEW_HEIGHT)),
    color: '#483d8b',
    speed: getRandomInt(5) / 10,
  }));
}

const BGLayer: React.FC = () => {
  const hexagons = createHexagons(6);
  return (
    <g>
      {hexagons.map((hex, index) => (
        <Hexagon key={index} {...hex} />
      ))}
    </g>
  );
};

export default BGLayer;
