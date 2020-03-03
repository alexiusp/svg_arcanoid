import * as React from 'react';

import styles from './Message.module.css';
import { VIEW_WIDTH, VIEW_HEIGHT } from '../constants';

export interface IMessageProps {
  onClose: () => void;
}

const CONTAINER_WIDTH = 480;
const CONTAINER_HEIGHT = 240;
const ANIMATION_TIMEOUT = 500;

enum AnimationPhase {
  Enter = 'enter',
  Show = 'show',
  Exit = 'exit',
}

const Message: React.FC<IMessageProps> = ({ children, onClose }) => {
  const [animation, setAnimation] = React.useState(AnimationPhase.Enter);
  const timeout = React.useRef<any>(null);
  React.useEffect(() => {
    console.log('useEffect', animation, timeout.current);
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
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }
  }, [animation, setAnimation, timeout, onClose]);
  const containerX = (VIEW_WIDTH - CONTAINER_WIDTH) / 2;
  const containerY = (VIEW_HEIGHT - CONTAINER_HEIGHT) / 2;
  const textX = containerX + CONTAINER_WIDTH / 2;
  const textY = containerY + CONTAINER_HEIGHT / 2;
  const className = `${styles.message} ${styles[animation]}`;
  const confirmHandler = () => setAnimation(AnimationPhase.Exit);
  const timeoutVar = { '--timeout': `${ANIMATION_TIMEOUT}ms` };
  return (
    <g className={className} onClick={confirmHandler} style={timeoutVar as React.CSSProperties}>
      <rect
        className={styles.container}
        x={containerX}
        y={containerY}
        width={CONTAINER_WIDTH}
        height={CONTAINER_HEIGHT}
      />
      <text className={styles.text} x={textX} y={textY} dominantBaseline="middle" textAnchor="middle">
        {children}
      </text>
    </g>
  );
};

export default Message;
