import { FC } from 'react';
import { DropdownArrow } from './DropdownArrow';

interface Props {
  placeholder?: string;
}

export const Dropdown: FC<Props> = props => {
  const { placeholder } = props;

  return (
    <div className="tw-relative">
      <input
        className="tw-h-12 tw-w-full tw-px-4 tw-rounded tw-bg-input tw-text-white tw-placeholder-white"
        placeholder={placeholder}
      />
      <div className="tw-absolute tw-h-12 tw-w-12 tw-right-0 tw-top-0 tw-flex tw-items-center tw-justify-center">
        <DropdownArrow className="tw-w-4 tw-h-auto" />
      </div>
    </div>
  );
};
