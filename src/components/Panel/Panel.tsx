import clsx from 'clsx';
import { FC, PropsWithChildren, ReactNode } from 'react';

interface Props {
  className?: string;
  head?: ReactNode;
}

export const Panel: FC<PropsWithChildren<Props>> = props => {
  const { className, head, children } = props;

  return (
    <section className={clsx(className, 'tw-px-4 tw-py-6 tw-bg-panel tw-h-60dvh tw-rounded')}>
      {head && (
        <header className="tw-font-normal tw-text-xl tw-text-primary tw-border-0 tw-border-b tw-border-solid tw-border-black tw-py-2 tw-mb-2">
          {head}
        </header>
      )}
      {children}
    </section>
  );
};
