import { FC, PropsWithChildren, ReactNode } from 'react';

interface Props {
  head?: ReactNode;
}

export const Panel: FC<PropsWithChildren<Props>> = props => {
  const { head, children } = props;

  return (
    <section className="tw-px-4 tw-py-6 tw-bg-panel tw-h-60dvh">
      {head && (
        <header className="tw-font-normal tw-text-xl tw-text-primary tw-border-0 tw-border-b tw-border-solid tw-border-black tw-py-2 tw-mb-2">
          {head}
        </header>
      )}
      {children}
    </section>
  );
};
