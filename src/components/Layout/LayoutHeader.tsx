import clsx from 'clsx';
import { FC } from 'react';
import { useAnimation } from '../../hooks';

interface Props {
  className?: string;
  open: boolean;
  onSetupClick(): void;
}

export const LayoutHeader: FC<Props> = props => {
  const { className, open, onSetupClick } = props;

  const { playState, playForward, hidden, onAnimationEnd } = useAnimation({
    title: 'layout-header',
    open,
  });

  return (
    <section
      className={clsx(
        className,
        'tw-absolute tw-top-0 tw-inset-x-0 tw-h-12 tw-bg-background tw-px-1 tw-flex tw-items-center tw-justify-between',
        hidden && 'tw-hidden',
        playForward ? 'tw-animate-layout-header-open' : 'tw-animate-layout-header-close',
      )}
      style={{
        animationPlayState: playState,
      }}
      onAnimationEnd={onAnimationEnd}>
      <button className="active:tw-brightness-150" onClick={onSetupClick}>
        <img className="tw-w-auto tw-h-8 tw-object-contain" src="images/icon_car_setup.png" />
      </button>
      <div>2</div>
    </section>
  );
};
