import clsx from 'clsx';
import { FC, Ref } from 'react';

interface Props {
  hidden?: boolean;
  videoRef?: Ref<HTMLVideoElement>;
}

export const Camera: FC<Props> = props => {
  const { hidden, videoRef } = props;

  return (
    <div
      className={clsx(
        'tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-stretch tw-justify-center tw-overflow-hidden',
        hidden && 'tw-hidden',
      )}>
      <video
        className="tw-max-h-dvh tw-w-full tw-h-auto tw-object-contain"
        autoPlay
        playsInline
        controls={false}
        ref={videoRef}
      />
    </div>
  );
};
