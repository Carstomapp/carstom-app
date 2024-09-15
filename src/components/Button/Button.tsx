import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

interface Props {
  disabled?: boolean;
  style: ButtonStyle;
  onClick?(): void;
}

export type ButtonStyle = 'primary' | 'secondary';

export const Button: FC<PropsWithChildren<Props>> = props => {
  const { disabled, style, onClick, children } = props;

  return (
    <button
      disabled={disabled}
      className={clsx(
        'tw-rounded tw-uppercase tw-py-2 tw-px-8 tw-text-sm tw-font-medium tw-border-2 tw-border-solid',
        'disabled:tw-bg-control-disabled active:disabled:tw-border-transparent',
        {
          'tw-bg-action tw-border-transparent active:tw-border-primary': style === 'primary',
          'tw-bg-transparent tw-border-action active:tw-border-primary': style === 'secondary',
        },
      )}
      onClick={onClick}>
      {children}
    </button>
  );
};
