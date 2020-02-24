import React from 'react';
import { connect } from 'react-redux';

import { Selectors } from '../app';
import { RootState } from '../store';
import { Actions as CaretActions } from '../caret';

export interface IRootProps {
  running: boolean;
  onKeyLeft: () => void;
  onKeyRight: () => void;
}

export const InputController: React.FC<IRootProps> = ({ running, onKeyLeft, onKeyRight }) => {
  React.useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      console.log('keyDownHandler', e);
      switch (e.code) {
        case 'ArrowLeft':
          onKeyLeft();
          break;
        case 'ArrowRight':
          onKeyRight();
          break;
        default:
          break;
      }
    };
    const keyUpHandler = (e: KeyboardEvent) => console.log('keyUpHandler', e);
    const cleanup = () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    }
    if (running) {
      document.addEventListener('keydown', keyDownHandler);
      document.addEventListener('keyup', keyUpHandler);
    } else {
      cleanup();
    }
    return cleanup;
  }, [ running, onKeyLeft, onKeyRight ]);
  return (
    <div />
  );
}

export const mapStateToProps = (state: RootState) => {
  const running = Selectors.isRunning(state);
  return {
    running,
  };
};

export const mapDispatchToProps = {
  onKeyLeft: CaretActions.moveLeftAction,
  onKeyRight: CaretActions.moveRightAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(InputController);
