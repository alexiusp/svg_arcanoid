import * as React from 'react';
import { connect } from 'react-redux';

import styles from './ScoresLayer.module.css';

import { RootState } from '../store';
import * as Selectors from './selectors';
import Hiscores from './Hiscores';

export interface IScoresLayerProps {
  scores: number;
  gameOver: boolean;
}

const ScoresLayer: React.FC<IScoresLayerProps> = ({ scores, gameOver }) => {
  return (
    <g>
      <text className={styles.scores} x={20} y={60}  dominantBaseline="middle">Scores: {scores}</text>
      {gameOver && (<Hiscores />)}
    </g>
  );
}

export const mapStateToProps = (state: RootState) => {
  const scores = Selectors.getScores(state);
  const gameOver = Selectors.isGameOver(state);
  return {
    scores,
    gameOver,
  };
}

export default connect(mapStateToProps)(ScoresLayer);
