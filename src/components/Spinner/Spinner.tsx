import clsx from 'clsx';
import { FC } from 'react';
import { useAnimation } from '../../hooks';

interface Props {
  open: boolean;
  onOpened?(): void;
  onClosed?(): void;
}

export const Spinner: FC<Props> = props => {
  const { open, onOpened, onClosed } = props;

  const { playState, playForward, onAnimationEnd } = useAnimation({
    title: 'spinner',
    open,
    onOpened,
    onClosed,
  });

  return (
    <div
      className={clsx(
        'tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-overflow-hidden',
        playForward ? 'tw-animate-spinner-open' : 'tw-animate-spinner-close',
      )}
      style={{
        animationPlayState: playState,
      }}
      onAnimationEnd={onAnimationEnd}>
      <img
        className="tw-max-h-dvh tw-w-1/2 tw-h-auto tw-object-contain tw-animate-spinner-large"
        src="images/spinner.svg"
      />
    </div>
  );
};
