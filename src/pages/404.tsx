import { FC } from 'react';
import { ErrorMessage } from '../components';

export const NotFoundPage: FC = () => {
  return (
    <div className="tw-p-6 tw-h-dvh tw-flex tw-items-center tw-justify-start">
      <ErrorMessage title="Requested page not found">
        The page you are looking for might have been removed had its name changed or is temporary unavailable.
      </ErrorMessage>
    </div>
  );
};

export default NotFoundPage;
