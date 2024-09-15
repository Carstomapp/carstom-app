import clsx from 'clsx';
import { FC } from 'react';
import { useAnimation } from '../../hooks';

interface Props {
  className?: string;
  open: boolean;
}

export const LayoutMain: FC<Props> = props => {
  const { className, open } = props;

  const { playState, playForward, hidden, onAnimationEnd } = useAnimation({
    title: 'layout-main',
    open,
  });

  return (
    <section
      className={clsx(
        className,
        'tw-absolute tw-bottom-0 tw-inset-x-0 tw-h-48 tw-bg-layout-main tw-rounded-t-xl',
        hidden && 'tw-hidden',
        playForward ? 'tw-animate-layout-main-open' : 'tw-animate-layout-main-close',
      )}
      style={{
        animationPlayState: playState,
      }}
      onAnimationEnd={onAnimationEnd}
    />
  );
};
