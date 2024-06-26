import clsx from 'clsx';
import { FC } from 'react';
import { useAnimation } from '../../hooks';

interface Props {
  open: boolean;
  onOpened?(): void;
  onClosed?(): void;
}

export const SplashLogo: FC<Props> = props => {
  const { open, onOpened, onClosed } = props;

  const { playState, playForward, onAnimationEnd } = useAnimation({
    title: 'splash',
    open,
    onOpened,
    onClosed,
  });

  return (
    <div className="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-stretch tw-justify-center tw-overflow-hidden">
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
            className={clsx(
              'tw-flex tw-justify-end tw-items-stretch tw-w-full tw-h-full tw-transform-gpu tw-opacity-0',
              playForward ? 'tw-animate-splash-logo-shine-open' : 'tw-animate-splash-logo-shine-close',
            )}
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
