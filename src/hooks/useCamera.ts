import { RefObject, useCallback, useRef } from 'react';
import { errors } from '../constants';
import { Logger } from '../utils';

interface Result {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  onCameraInitialize(): Promise<void>;
  onCameraCleanup(): void;
}

export function useCamera(): Result {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream>();

  const onCameraInitialize = useCallback(async () => {
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

  const onCameraCleanup = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
    }
  }, []);

  return {
    videoRef,
    canvasRef,
    onCameraInitialize,
    onCameraCleanup,
  };
}
