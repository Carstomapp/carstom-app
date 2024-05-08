import { FC } from 'react';

interface Props {
  className?: string;
}

export const DropdownArrow: FC<Props> = props => {
  const { className } = props;

  return (
    <svg
      className={className}
      width="36"
      height="19"
      viewBox="0 0 36 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M0.423096 0.345947L17.7308 17.6635L35.0385 0.345947" stroke="white" />
    </svg>
  );
};
