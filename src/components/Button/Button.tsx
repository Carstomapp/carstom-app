import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

interface Props {
  disabled?: boolean;
  onClick?(): void;
}

export const Button: FC<PropsWithChildren<Props>> = props => {
  const { disabled, onClick, children } = props;

  return (
    <button
      disabled={disabled}
      className={clsx(
        'tw-bg-action tw-rounded tw-uppercase tw-py-2 tw-px-8 tw-text-sm tw-font-medium',
        'tw-border-2 tw-border-solid tw-border-transparent active:tw-border-primary',
        'disabled:tw-bg-control-disabled active:disabled:tw-border-transparent',
      )}
      onClick={onClick}>
      {children}
    </button>
  );
};
