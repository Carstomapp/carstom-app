import clsx from 'clsx';
import { FC, RefObject, useCallback } from 'react';

interface Props {
  hidden?: boolean;
  videoRef?: RefObject<HTMLVideoElement>;
  canvasRef?: RefObject<HTMLCanvasElement>;
  onCameraReady?(): void;
}

export const Camera: FC<Props> = props => {
  const { hidden, videoRef, canvasRef, onCameraReady } = props;

  const onVideoCanPlay = useCallback(async () => {
    if (!videoRef?.current || !canvasRef?.current) {
      return;
    }

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    canvasRef.current.setAttribute('width', String(width));
    canvasRef.current.setAttribute('height', String(height));

    onCameraReady?.();
  }, [onCameraReady]);

  return (
    <div
      className={clsx(
        'tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-stretch tw-justify-center tw-overflow-hidden',
        hidden && 'tw-hidden',
      )}>
      <video
        className="tw-w-full tw-h-dvh tw-object-cover"
        autoPlay
        playsInline
        controls={false}
        ref={videoRef}
        onCanPlay={onVideoCanPlay}
      />
      <canvas className="tw-hidden" ref={canvasRef} />
    </div>
  );
};
