import React from 'react';
import { connect } from 'react-redux';

import { Selectors } from '../app';
import { RootState } from '../store';
import { Actions as CaretActions } from '../caret';
import { Actions as BallsActions } from '../balls';

export interface IRootProps {
  running: boolean;
  onKeyLeft: () => void;
  onKeyRight: () => void;
  onKeyUp: () => void;
  onKeySpace: () => void;
}

export const InputController: React.FC<IRootProps> = ({ running, onKeyLeft, onKeyRight, onKeyUp, onKeySpace }) => {
  React.useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      // console.log('keyDownHandler', e.code);
      switch (e.code) {
        case 'ArrowLeft':
          onKeyLeft();
          break;
        case 'ArrowRight':
          onKeyRight();
          break;
        case 'Space':
          onKeySpace();
          break;
        default:
          break;
      }
    };
    const keyUpHandler = (e: KeyboardEvent) => {
      // console.log('keyUpHandler', e.code);
      switch (e.code) {
        case 'ArrowLeft':
        case 'ArrowRight':
          onKeyUp();
          break;
        default:
          break;
      }
    };
    const cleanup = () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
    if (running) {
      document.addEventListener('keydown', keyDownHandler);
      document.addEventListener('keyup', keyUpHandler);
    } else {
      cleanup();
    }
    return cleanup;
  }, [running, onKeyLeft, onKeyRight, onKeyUp, onKeySpace]);
  return <div />;
};

export const mapStateToProps = (state: RootState) => {
  const running = Selectors.isRunning(state);
  return {
    running,
  };
};

export const mapDispatchToProps = {
  onKeyLeft: CaretActions.moveLeftAction,
  onKeyRight: CaretActions.moveRightAction,
  onKeyUp: CaretActions.stopCaretAction,
  onKeySpace: BallsActions.kickBallAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(InputController);
