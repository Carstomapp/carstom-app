import { FC } from 'react';

export const SplashLogo: FC = () => {
  return (
    <div className="tw-relative tw-overflow-hidden">
      <img
        className="tw-max-h-dvh tw-w-full tw-h-auto tw-object-contain tw-animate-splash-logo-background"
        src="images/logo_back.png"
      />
      <div className="tw-absolute tw-flex tw-items-center tw-w-full tw-top-1/2 tw-translate-y-[-50%] tw-animate-splash-logo-foreground-open">
        <img className="tw-max-h-dvh tw-w-full tw-h-auto tw-object-contain" src="images/logo_front.png" />
        <div
          className="tw-absolute tw-inset-0"
          style={{
            mask: 'url(images/logo_front.png)',
            maskSize: 'contain',
          }}>
          <div className="tw-flex tw-justify-end tw-items-center tw-w-full tw-h-full tw-opacity-0 tw-animate-splash-logo-shine">
            <div className="tw-bg-white tw-rounded-full tw-w-[20vw] tw-h-[20vw] tw-mr-[10vw]" />
          </div>
        </div>
      </div>
    </div>
  );
};
