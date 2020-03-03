import * as React from 'react';
import { connect } from 'react-redux';

import styles from './Hiscores.module.css';

import { RootState } from '../store';
import * as Selectors from './selectors';
import { VIEW_WIDTH, VIEW_HEIGHT } from '../constants';
import { Actions } from '.';

export interface IHiscoresProps {
  hiscores: number[];
  position: number;
  onClose: () => void;
}

const PANEL_ITEM_WIDTH = 360;
const PANEL_ITEM_HEIGHT = 60;
const PANEL_PADDING = 4;
const panelWidth = PANEL_ITEM_WIDTH + PANEL_PADDING * 2;
const panelX = Math.round((VIEW_WIDTH - panelWidth) / 2);

const Hiscores: React.FC<IHiscoresProps> = ({ hiscores, position, onClose }) => {
  const amount = hiscores.length;
  const panelHeight = (PANEL_ITEM_HEIGHT + PANEL_PADDING * 2) * (amount + 1);
  const panelY = Math.round((VIEW_HEIGHT - panelHeight) / 2);
  return (
    <g onClick={() => onClose()}>
      <rect className={styles.hiscoresOverlay} x={0} y={0} width={VIEW_WIDTH} height={VIEW_HEIGHT} />
      <rect className={styles.hiscore} x={panelX} y={panelY} width={panelWidth} height={panelHeight} />
      <rect x={panelX + PANEL_PADDING} y={panelY + PANEL_PADDING} width={PANEL_ITEM_WIDTH} height={PANEL_ITEM_HEIGHT} />
      <text
        className={styles.hiscoreLabel}
        x={panelX + panelWidth / 2}
        y={panelY + PANEL_PADDING + PANEL_ITEM_HEIGHT / 2}
        dominantBaseline="middle"
        textAnchor="middle">
        Hiscores:
      </text>
      {hiscores.map((score, index) => {
        const rectX = panelX + PANEL_PADDING;
        const rectY = panelY + (PANEL_ITEM_HEIGHT + PANEL_PADDING * 2) * (index + 1);
        const textX = panelX + panelWidth / 2;
        const textY = rectY + PANEL_PADDING + PANEL_ITEM_HEIGHT / 2;
        const boxClass = `${styles.hiscoreBox} ${position === index + 1 ? styles.current : ''}`;
        return (
        <g key={index} className={boxClass}>
          <rect
            x={rectX}
            y={rectY}
            width={PANEL_ITEM_WIDTH}
            height={PANEL_ITEM_HEIGHT}
          />
          <text
            className={styles.hiscoreLabel}
            x={textX}
            y={textY}
            dominantBaseline="middle"
            textAnchor="middle">
            {score}
          </text>
        </g>
      )})}
    </g>
  );
};

export const mapStateToProps = (state: RootState) => {
  const hiscores = Selectors.getHiscores(state);
  const position = Selectors.getPlayerPosition(state);
  return {
    hiscores,
    position,
  };
};

export const mapDispatchToProps = {
  onClose: Actions.stopAppAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Hiscores);
