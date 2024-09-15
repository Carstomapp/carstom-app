import clsx from 'clsx';
import { FC } from 'react';
import { useAnimation } from '../../hooks';

interface Props {
  className?: string;
  open: boolean;
}

export const LayoutHeader: FC<Props> = props => {
  const { className, open } = props;

  const { playState, playForward, hidden, onAnimationEnd } = useAnimation({
    title: 'layout-header',
    open,
  });

  return (
    <section
      className={clsx(
        className,
        'tw-absolute tw-top-0 tw-inset-x-0 tw-h-12 tw-bg-background tw-shadow-lg',
        hidden && 'tw-hidden',
        playForward ? 'tw-animate-layout-header-open' : 'tw-animate-layout-header-close',
      )}
      style={{
        animationPlayState: playState,
      }}
      onAnimationEnd={onAnimationEnd}
    />
  );
};
