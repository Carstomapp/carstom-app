import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

interface Props {
  onClick?(): void;
}

export const Button: FC<PropsWithChildren<Props>> = props => {
  const { onClick, children } = props;

  return (
    <button
      className={clsx(
        'tw-bg-action tw-rounded tw-uppercase tw-py-2 tw-px-8 tw-text-sm tw-font-medium',
        'tw-border-2 tw-border-solid tw-border-transparent active:tw-border-primary',
      )}
      onClick={onClick}>
      {children}
    </button>
  );
};
