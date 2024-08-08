import { Ref, useCallback, useRef } from 'react';
import { errors } from '../constants';
import { Logger } from '../utils/Logger';

interface Result {
  videoRef: Ref<HTMLVideoElement>;
  onCameraInitialize(): Promise<void>;
}

export function useCamera(): Result {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onCameraInitialize = useCallback(async () => {
    if (!videoRef.current) {
      return;
    }

    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      Logger.info('Start camera initialization');

      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
        },
      });

      videoRef.current.srcObject = videoStream;

      Logger.info('End camera initialization');
    } else {
      throw new Error(errors.CAMERA_INITIALIZATION);
    }
  }, []);

  return {
    videoRef,
    onCameraInitialize,
  };
}
