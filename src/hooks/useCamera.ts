import { RefObject, useCallback, useRef } from 'react';
import { errors } from '../constants';
import { Logger } from '../utils';

interface Props {
  onFrame?(dataUrl: string, data: ImageData): Promise<void>;
}

interface Result {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  initializeCamera(): Promise<void>;
  cleanupCamera(): void;
  captureCameraFrame(): Promise<void>;
}

export function useCamera(props: Props): Result {
  const { onFrame } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream>();

  const initializeCamera = useCallback(async () => {
    if (!videoRef.current) {
      return;
    }

    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      Logger.info('Start camera initialization');

      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
        },
      });

      videoRef.current.srcObject = streamRef.current;

      Logger.info('End camera initialization');
    } else {
      throw new Error(errors.CAMERA_INITIALIZATION);
    }
  }, []);

  const cleanupCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
    }
  }, []);

  const captureCameraFrame = useCallback(async () => {
    if (!canvasRef.current || !videoRef.current) {
      return;
    }

    const context = canvasRef.current.getContext('2d');

    if (!context) {
      throw new Error(errors.CANVAS_2D_INITIALIZATION);
    }

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, width, height);

    const dataUrl = canvasRef.current.toDataURL('image/png');
    const data = context.getImageData(0, 0, width, height);

    await onFrame?.(dataUrl, data);
  }, [onFrame]);

  return {
    videoRef,
    canvasRef,
    initializeCamera,
    cleanupCamera,
    captureCameraFrame,
  };
}
