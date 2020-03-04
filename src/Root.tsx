import React from 'react';

import './Root.css';
import { ScoresLayer } from './app';
import { VIEW_WIDTH, VIEW_HEIGHT } from './constants';

import { Caret } from './caret';
import { BallsLayer } from './balls';
import { BricksLayer } from './bricks';
import MainMenu from './input/MainMenu';
import BGLayer from './bg/BGLayer';
import Message from './app/Message';

const Root: React.FC = () => (
    <div className="root">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}>
        <BGLayer />
        <BricksLayer />
        <BallsLayer />
        <Caret />
        <ScoresLayer />
        <MainMenu />
        <Message />
      </svg>
    </div>
);

export default Root;
