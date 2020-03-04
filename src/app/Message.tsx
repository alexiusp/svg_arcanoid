import * as React from 'react';
import { connect } from 'react-redux';

import styles from './Message.module.css';

import { VIEW_WIDTH, VIEW_HEIGHT } from '../constants';
import { RootState } from '../store';
import * as Actions from './actions';
import * as Selectors from './selectors';

export interface IMessageProps {
  message: string;
  onClose: () => void;
}

const CONTAINER_WIDTH = 600;
const CONTAINER_HEIGHT = 180;
const ANIMATION_TIMEOUT = 500;

enum AnimationPhase {
  Enter = 'enter',
  Show = 'show',
  Exit = 'exit',
}

const MessageFC: React.FC<IMessageProps> = ({ message, onClose }) => {
  const [animation, setAnimation] = React.useState(AnimationPhase.Enter);
  const timeout = React.useRef<any>(null);
  React.useEffect(() => {
    if (message) {
      switch (animation) {
        case AnimationPhase.Enter:
          timeout.current = setTimeout(() => {
            clearTimeout(timeout.current);
            setAnimation(AnimationPhase.Show);
          }, ANIMATION_TIMEOUT);
          break;
        case AnimationPhase.Exit:
          timeout.current = setTimeout(() => {
            clearTimeout(timeout.current);
            onClose();
          }, ANIMATION_TIMEOUT);
          break;
      }
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [animation, setAnimation, timeout, onClose, message]);
  if (!message) return null;
  const containerX = (VIEW_WIDTH - CONTAINER_WIDTH) / 2;
  const containerY = (VIEW_HEIGHT - CONTAINER_HEIGHT) / 2;
  const textX = containerX + CONTAINER_WIDTH / 2;
  const textY = containerY + CONTAINER_HEIGHT / 2;
  const className = `${styles.message} ${styles[animation]}`;
  const confirmHandler = () => setAnimation(AnimationPhase.Exit);
  const timeoutVar = { '--timeout': `${ANIMATION_TIMEOUT}ms` };
  return (
    <>
      <rect className={styles.overlay} x={0} y={0} width={VIEW_WIDTH} height={VIEW_HEIGHT} onClick={confirmHandler} />
      <g className={className} style={timeoutVar as React.CSSProperties}>
        <rect
          className={styles.container}
          x={containerX}
          y={containerY}
          width={CONTAINER_WIDTH}
          height={CONTAINER_HEIGHT}
          rx={30}
          ry={30}
        />
        <text className={styles.text} x={textX} y={textY} dominantBaseline="middle" textAnchor="middle">
          {message}
        </text>
      </g>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  message: Selectors.getMessage(state),
});

const mapDispatchToProps = {
  onClose: Actions.clearMessageAction,
};

const Message = connect(mapStateToProps, mapDispatchToProps)(MessageFC);
export default Message;
