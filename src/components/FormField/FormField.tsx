import { FC, PropsWithChildren } from 'react';

export const FormField: FC<PropsWithChildren> = props => {
  const { children } = props;

  return <div className="tw-mb-6">{children}</div>;
};
