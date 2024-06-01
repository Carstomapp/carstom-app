import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  className?: string;
}

export const DropdownSpinner: FC<Props> = props => {
  const { className } = props;

  return (
    <div
      className={clsx(
        className,
        'tw-rounded-full tw-border tw-border-solid tw-border-transparent tw-border-r-white tw-animate-spinner-dropdown',
      )}
    />
  );
};
