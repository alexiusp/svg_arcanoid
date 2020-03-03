import React from 'react';
import { connect } from 'react-redux';

import styles from './MainMenu.module.css';

import { Selectors } from '../app';
import { RootState } from '../store';
import { Actions as AppActions } from '../app';
import { VIEW_WIDTH, VIEW_HEIGHT } from '../constants';

export interface IMainMenuProps {
  running: boolean;
  onStart: () => void;
}

const MENU_ITEM_WIDTH = 360;
const MENU_ITEM_HEIGHT = 120;
const MENU_PADDING = 10;
const menuItemsLength = 1;
const menuWidth = MENU_ITEM_WIDTH + MENU_PADDING * 2;
const menuX = Math.round((VIEW_WIDTH - menuWidth) / 2);
const menuHeight = (MENU_ITEM_HEIGHT + MENU_PADDING * 2) * menuItemsLength;
const menuY = Math.round((VIEW_HEIGHT - menuHeight) / 2);

export const MainMenu: React.FC<IMainMenuProps> = ({ running, onStart }) => {
  const [isAnimating, toggleAnimation] = React.useState<boolean>(false);
  const timeout = React.useRef<NodeJS.Timeout | number | undefined>(undefined);
  const clickHandler = () => {
    toggleAnimation(true);
    timeout.current = setTimeout(() => {
      toggleAnimation(false);
      onStart();
      clearTimeout(timeout.current as number);
    }, 900);
  };
  const menuClasses = `${isAnimating ? styles.animating : ''}`;
  return running ? null : (
    <g className={menuClasses}>
      <rect className={styles.menuOverlay} x={0} y={0} width={VIEW_WIDTH} height={VIEW_HEIGHT} />
      <rect className={styles.container} x={menuX} y={menuY} width={menuWidth} height={menuHeight} rx={10} ry={10} />
      <g className={styles.menuItem} onClick={clickHandler}>
        <rect
          x={menuX + MENU_PADDING}
          y={menuY + MENU_PADDING}
          width={MENU_ITEM_WIDTH}
          height={MENU_ITEM_HEIGHT}
          rx={10}
          ry={10}
        />
        <text
          className={styles.menuLabel}
          x={menuX + menuWidth / 2}
          y={menuY + MENU_PADDING + MENU_ITEM_HEIGHT / 2}
          dominantBaseline="middle"
          textAnchor="middle">
          START GAME
        </text>
      </g>
    </g>
  );
};

export const mapStateToProps = (state: RootState) => {
  const running = Selectors.isRunning(state);
  return {
    running,
  };
};

export const mapDispatchToProps = {
  onStart: AppActions.startAppAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
