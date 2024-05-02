import { FC, PropsWithChildren, ReactNode } from 'react';

interface Props {
  head?: ReactNode;
}

export const Panel: FC<PropsWithChildren<Props>> = props => {
  const { head, children } = props;

  return (
    <section className="tw-p-6 tw-bg-panel tw-h-dvh/2">
      {head && <header>{head}</header>}
      {children}
    </section>
  );
};
