import clsx from 'clsx';
import { FC, RefObject, useCallback } from 'react';
import { errors } from '../../constants';

interface Props {
  hidden?: boolean;
  videoRef?: RefObject<HTMLVideoElement>;
  canvasRef?: RefObject<HTMLCanvasElement>;
  onFrame?(dataUrl: string, data: ImageData): Promise<void>;
  onCameraReady?(): void;
}

export const Camera: FC<Props> = props => {
  const { hidden, videoRef, canvasRef, onFrame, onCameraReady } = props;

  const onVideoCanPlay = useCallback(async () => {
    if (!videoRef?.current || !canvasRef?.current) {
      return;
    }

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    canvasRef.current.setAttribute('width', String(width));
    canvasRef.current.setAttribute('height', String(height));

    const context = canvasRef.current.getContext('2d');

    if (!context) {
      throw new Error(errors.CANVAS_2D_INITIALIZATION);
    }

    context.drawImage(videoRef.current, 0, 0, width, height);

    const dataUrl = canvasRef.current.toDataURL('image/png');
    const data = context.getImageData(0, 0, width, height);
    onCameraReady?.();
    await onFrame?.(dataUrl, data);
  }, [onFrame, onCameraReady]);

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
