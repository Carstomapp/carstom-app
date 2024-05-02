import clsx from 'clsx';
import { CSSProperties, FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Logger } from '../../utils/Logger';

interface Props {
  className?: string;
  open: boolean;
  onOpened?(): void;
  onClosed?(): void;
}

export const CoreStep: FC<PropsWithChildren<Props>> = props => {
  const { className, open, onOpened, onClosed, children } = props;

  const [playState, setPlayState] = useState<CSSProperties['animationPlayState']>('paused');
  const [idleState, setIdleState] = useState<CSSProperties['animationPlayState']>('paused');
  const [playForward, setPlayForward] = useState(true);

  const onAnimationEnd = useCallback(() => {
    setPlayState('paused');
    setPlayForward(true);

    if (playForward) {
      Logger.info('End step open animation');
      onOpened?.();
    } else {
      Logger.info('End step close animation');
      onClosed?.();
    }
  }, [onOpened, onClosed, playForward, setPlayState, setPlayForward]);

  useEffect(() => {
    if (open && idleState === 'paused') {
      Logger.info('Start step open animation');
      setPlayForward(true);
      setPlayState('running');
      setIdleState('running');
    }

    if (!open && idleState === 'running') {
      Logger.info('Start step close animation');
      setPlayForward(false);
      setPlayState('running');
      setIdleState('paused');
    }
  }, [open]);

  return (
    <div
      className={clsx(className, playForward ? 'tw-animate-core-step-open' : 'tw-animate-core-step-close')}
      style={{
        animationPlayState: playState,
      }}
      onAnimationEnd={onAnimationEnd}>
      {children}
    </div>
  );
};
