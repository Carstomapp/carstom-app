import clsx from 'clsx';
import { FC } from 'react';
import { useAnimation } from '../../hooks';

interface Props {
  open: boolean;
  onOpened?(): void;
  onClosed?(): void;
}

export const CoreStepImage: FC<Props> = props => {
  const { open, onOpened, onClosed } = props;

  const { playState, playForward, hidden, onAnimationEnd } = useAnimation({
    title: 'step image',
    open,
    onOpened,
    onClosed,
  });

  return (
    <img
      className={clsx(
        'tw-absolute tw-top-0 tw-right-0 tw-w-1/2 tw-h-auto tw-object-contain',
        playForward ? 'tw-animate-core-step-image-open' : 'tw-animate-core-step-image-close',
      )}
      src="images/step_image.png"
      style={{
        animationPlayState: playState,
      }}
      onAnimationEnd={onAnimationEnd}
    />
  );
};
