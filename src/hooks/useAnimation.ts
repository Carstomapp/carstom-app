import { AnimationEvent, CSSProperties, useCallback, useEffect, useState } from 'react';
import { Logger } from '../utils';

interface Props {
  title: string;
  open: boolean;
  onOpened?(): void;
  onClosed?(): void;
}

interface Result {
  playState: CSSProperties['animationPlayState'];
  idleState: CSSProperties['animationPlayState'];
  playForward: boolean;
  hidden: boolean;
  onAnimationEnd(event: AnimationEvent): void;
}

export function useAnimation(props: Props): Result {
  const { title, open, onOpened, onClosed } = props;

  const [playState, setPlayState] = useState<CSSProperties['animationPlayState']>('paused');
  const [idleState, setIdleState] = useState<CSSProperties['animationPlayState']>('paused');
  const [playForward, setPlayForward] = useState(true);
  const [hidden, setHidden] = useState(false);

  const onAnimationEnd = useCallback(
    (event: AnimationEvent) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      setPlayState('paused');
      setPlayForward(true);

      if (playForward) {
        Logger.info(`End ${title} open animation`);
        onOpened?.();
      } else {
        Logger.info(`End ${title} close animation`);
        onClosed?.();
        setHidden(true);
      }
    },
    [title, onOpened, onClosed, playForward, setPlayState, setPlayForward, setHidden],
  );

  useEffect(() => {
    if (open && idleState === 'paused') {
      setHidden(false);
      Logger.info(`Start ${title} open animation`);
      setPlayForward(true);
      setPlayState('running');
      setIdleState('running');
    }

    if (!open && idleState === 'running') {
      Logger.info(`Start ${title} close animation`);
      setPlayForward(false);
      setPlayState('running');
      setIdleState('paused');
    }
  }, [open]);

  return {
    playState,
    idleState,
    playForward,
    hidden,
    onAnimationEnd,
  };
}
