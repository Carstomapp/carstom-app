import { FC, PropsWithChildren } from 'react';

interface Props {
  onClick?(): void;
}

export const Button: FC<PropsWithChildren<Props>> = props => {
  const { onClick, children } = props;

  return (
    <button
      className="tw-bg-action tw-rounded tw-uppercase tw-py-2 tw-px-8 tw-text-sm tw-font-medium"
      onClick={onClick}>
      {children}
    </button>
  );
};
