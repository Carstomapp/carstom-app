import { FC, PropsWithChildren } from 'react';

interface Props {
  onClick?(): void;
}

export const Button: FC<PropsWithChildren<Props>> = props => {
  const { onClick, children } = props;

  return <button onClick={onClick}>{children}</button>;
};
