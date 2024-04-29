import clsx from 'clsx';
import { CSSProperties, FC, useCallback, useEffect, useState } from 'react';
import { Logger } from '../../utils/Logger';

interface Props {
  open: boolean;
  onOpened?(): void;
  onClosed?(): void;
}

export const SplashLogo: FC<Props> = props => {
  const { open, onOpened, onClosed } = props;

  const [playState, setPlayState] = useState<CSSProperties['animationPlayState']>('paused');
  const [idleState, setIdleState] = useState<CSSProperties['animationPlayState']>('paused');
  const [playForward, setPlayForward] = useState(true);

  const onAnimationEnd = useCallback(() => {
    setPlayState('paused');
    setPlayForward(true);

    if (playForward) {
      Logger.info('End splash open animation');
      onOpened?.();
    } else {
      Logger.info('End splash close animation');
      onClosed?.();
    }
  }, [onOpened, onClosed, playForward, setPlayState, setPlayForward]);

  useEffect(() => {
    if (open && idleState === 'paused') {
      Logger.info('Start splash open animation');
      setPlayForward(true);
      setPlayState('running');
      setIdleState('running');
    }

    if (!open && idleState === 'running') {
      Logger.info('Start splash close animation');
      setPlayForward(false);
      setPlayState('running');
      setIdleState('paused');
    }
  }, [open]);

  return (
    <div className="tw-relative tw-overflow-hidden">
      <img
        className={clsx(
          'tw-max-h-dvh tw-w-full tw-h-auto tw-object-contain',
          playForward ? 'tw-animate-splash-logo-background-open' : 'tw-animate-splash-logo-background-close',
        )}
        src="images/logo_back.png"
        style={{
          animationPlayState: playState,
        }}
      />
      <div
        className={clsx(
          'tw-absolute tw-flex tw-items-center tw-w-full tw-top-1/2',
          playForward ? 'tw-animate-splash-logo-foreground-open' : 'tw-animate-splash-logo-foreground-close',
        )}
        style={{
          animationPlayState: playState,
        }}>
        <img
          className="tw-max-h-dvh tw-w-full tw-h-auto tw-object-contain tw-translate-y-[-50%]"
          src="images/logo_front.png"
        />
        <div
          className="tw-absolute tw-inset-0 tw-translate-y-[-50%]"
          style={{
            mask: 'url(images/logo_front.png)',
            maskSize: 'contain',
          }}>
          <div
            className="tw-flex tw-justify-end tw-items-stretch tw-w-full tw-h-full tw-transform-gpu tw-opacity-0 tw-animate-splash-logo-shine-open"
            style={{
              animationPlayState: playState,
            }}
            onAnimationEnd={onAnimationEnd}>
            <div className="tw-bg-white tw-w-[10vw] tw-skew-x-[-15deg]" />
          </div>
        </div>
      </div>
    </div>
  );
};
