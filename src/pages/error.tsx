import { useLocation } from '@reach/router';
import { FC, useMemo } from 'react';
import { ErrorMessage } from '../components';
import { ErrorNavigationState } from '../types';

export const ErrorPage: FC = () => {
  const location = useLocation();
  const locationState = useMemo(() => location.state as ErrorNavigationState, [location.state]);

  return (
    <div className="tw-p-6 tw-h-dvh tw-flex tw-items-center tw-justify-start">
      <ErrorMessage canGoHome={locationState?.canGoHome}>{locationState?.errorMessage}</ErrorMessage>
    </div>
  );
};

export default ErrorPage;
