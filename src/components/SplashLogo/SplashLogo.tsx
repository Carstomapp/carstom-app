import { FC } from 'react';

export const SplashLogo: FC = () => {
  return (
    <div className="tw-relative">
      <img className="tw-max-h-screen tw-w-full tw-h-auto tw-object-contain" src="images/logo_back.png" />
      <img
        className="tw-absolute tw-max-h-screen tw-w-full tw-h-auto tw-object-contain tw-top-1/2 tw-translate-y-[-50%]"
        src="images/logo_front.png"
      />
    </div>
  );
};
