import * as React from 'react';
import { connect } from 'react-redux';

import styles from './ScoresLayer.module.css';

import { RootState } from '../store';
import * as Selectors from './selectors';
import { VIEW_WIDTH } from '../constants';

export interface IScoresLayerProps {
  scores: number;
}

const ScoresLayer: React.FC<IScoresLayerProps> = ({ scores }) => {
  return (
    <g>
      <text className={styles.scores} x={VIEW_WIDTH - 360} y={120}>Scores: {scores}</text>
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
