import * as React from 'react';
import { connect } from 'react-redux';

import styles from './ScoresLayer.module.css';

import { RootState } from '../store';
import * as Selectors from './selectors';

export interface IScoresLayerProps {
  scores: number;
}

const ScoresLayer: React.FC<IScoresLayerProps> = ({ scores }) => {
  return (
    <g>
      <text className={styles.scores} x={20} y={60}  dominantBaseline="middle">Scores: {scores}</text>
    </g>
  );
}

export const mapStateToProps = (state: RootState) => {
  const scores = Selectors.getScores(state);
  return {
    scores,
  };
}

export default connect(mapStateToProps)(ScoresLayer);
