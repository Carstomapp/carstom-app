import { FC } from 'react';

export const NotFoundPage: FC = () => {
  return (
    <div className="tw-p-6 tw-h-dvh tw-flex tw-items-center tw-justify-center">
      <div className="tw-text-2xl">Sorry! Requested page not found</div>
    </div>
  );
};

export default NotFoundPage;
