import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { useAnimation } from '../../hooks';

interface Props {
  className?: string;
  open: boolean;
  back: boolean;
  onOpened?(): void;
  onClosed?(): void;
}

export const CoreStep: FC<PropsWithChildren<Props>> = props => {
  const { className, open, back, onOpened, onClosed, children } = props;

  const { playState, playForward, hidden, onAnimationEnd } = useAnimation({
    title: 'step',
    open,
    onOpened,
    onClosed,
  });

  return (
    <div
      className={clsx(
        className,
        'tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-stretch tw-justify-center',
        hidden && 'tw-hidden',
        {
          'tw-animate-core-step-open': playForward && !back,
          'tw-animate-core-step-return-open': playForward && back,
          'tw-animate-core-step-close': !playForward && !back,
          'tw-animate-core-step-return-close': !playForward && back,
        },
      )}
      style={{
        animationPlayState: playState,
      }}
      onAnimationEnd={onAnimationEnd}>
      {children}
    </div>
  );
};
