import { navigate } from 'gatsby';
import { FC, PropsWithChildren, ReactNode, useCallback } from 'react';
import { Navigation } from '../../utils';
import { Button } from '../Button';

interface Props {
  title?: ReactNode;
  canGoHome?: boolean;
}

export const ErrorMessage: FC<PropsWithChildren<Props>> = props => {
  const { title = 'An error has occurred', canGoHome = true, children } = props;

  const onGoHomeClick = useCallback(() => {
    navigate(Navigation.getRouteWithToken('/'));
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-items-start">
      <div className="tw-text-xl tw-text-primary">Sorry! :(</div>
      <div className="tw-text-2xl tw-text-primary tw-font-medium">{title}</div>
      <div className="tw-pt-4">{children}</div>
      {canGoHome && (
        <div className="tw-pt-4">
          <Button style="secondary" onClick={onGoHomeClick}>
            Go to home page
          </Button>
        </div>
      )}
    </div>
  );
};
