import clsx from 'clsx';
import { FC, RefObject, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { v4 } from 'uuid';
import { NNCoordinates } from '../../api/types';
import { Logger } from '../../utils';

interface Props {
  hidden?: boolean;
  enableVisualLogger?: boolean;
  sceneRef: RefObject<THREE.Scene | undefined>;
  cameraRef: RefObject<THREE.Camera | undefined>;
  rendererRef: RefObject<THREE.WebGLRenderer | undefined>;
  coordinates: NNCoordinates[];
  canvasRef?: RefObject<HTMLCanvasElement>;
}

export const AR: FC<Props> = props => {
  const { hidden, enableVisualLogger, sceneRef, cameraRef, rendererRef, coordinates, canvasRef } = props;

  const loggerTargetId = useMemo(() => v4(), []);

  useEffect(() => {
    Logger.setDuplicateTargetId(loggerTargetId);
    return () => Logger.setDuplicateTargetId(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef?.current || hidden) {
      return;
    }

    const { width, height } = canvasRef.current.getBoundingClientRect();

    canvasRef.current.setAttribute('width', String(width));
    canvasRef.current.setAttribute('height', String(height));
  }, [hidden]);

  useEffect(() => {
    if (!sceneRef?.current || !cameraRef?.current || !rendererRef?.current) {
      return;
    }

    if (coordinates.length > 0) {
      // TODO: Implement marker: begin
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      sceneRef.current.add(cube);

      cameraRef.current!.position.z = 0;
      cube.position.set(0, 0, -5);

      const initialRotation = new THREE.Quaternion();
      initialRotation.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

      let headingDrift = 0;
      let alphaOffset: number | undefined;

      window.addEventListener('deviceorientation', event => {
        // const webkitCompassHeading: number = Reflect.get(event, 'webkitCompassHeading');
        // const webkitCompassAccuracy: number = Number(Reflect.get(event, 'webkitCompassAccuracy'));

        // if (typeof event.alpha !== 'number') {
        //   return;
        // }

        // if (event.absolute) {
        //   alphaOffset = 0;
        // }

        // if (
        //   (typeof alphaOffset !== 'number' || Math.abs(headingDrift) > 5) &&
        //   typeof webkitCompassHeading !== 'number' &&
        //   webkitCompassAccuracy >= 0 &&
        //   webkitCompassAccuracy < 80 &&
        //   webkitCompassHeading >= 0
        // ) {
        //   if (typeof alphaOffset !== 'number') {
        //     alphaOffset = -webkitCompassHeading;
        //   } else {
        //     alphaOffset -= headingDrift;
        //   }
        // }

        // if (
        //   typeof alphaOffset !== 'number' ||
        //   typeof event.alpha !== 'number' ||
        //   typeof event.beta !== 'number' ||
        //   typeof event.gamma !== 'number'
        // ) {
        //   return;
        // }

        // const alpha = THREE.MathUtils.degToRad(event.alpha + alphaOffset || -webkitCompassHeading || 0);
        const alpha = THREE.MathUtils.degToRad(event.alpha);
        const beta = THREE.MathUtils.degToRad(event.beta);
        const gamma = THREE.MathUtils.degToRad(event.gamma);

        const alphaQuaternion = new THREE.Quaternion();
        alphaQuaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), alpha);

        const betaQuaternion = new THREE.Quaternion();
        betaQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), beta);

        const alphaBetaQuaternion = new THREE.Quaternion();
        alphaBetaQuaternion.multiplyQuaternions(alphaQuaternion, betaQuaternion);

        const gammaQuaternion = new THREE.Quaternion();
        gammaQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), gamma);

        const alphaBetaGammaQuaternion = new THREE.Quaternion();
        alphaBetaGammaQuaternion.multiplyQuaternions(alphaBetaQuaternion, gammaQuaternion);

        const resultQuaternion = new THREE.Quaternion();
        resultQuaternion.multiplyQuaternions(initialRotation, alphaBetaGammaQuaternion);

        cameraRef.current!.quaternion.copy(resultQuaternion);
      });

      function animate() {
        rendererRef.current!.render(sceneRef.current!, cameraRef.current!);
      }
      rendererRef.current.setAnimationLoop(animate);
      // TODO: Implement marker: end
    } else {
      sceneRef.current.clear();
    }
  }, [coordinates]);

  return (
    <div
      className={clsx(
        'tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-stretch tw-justify-center tw-overflow-hidden',
        hidden && 'tw-hidden',
      )}>
      <canvas className="tw-w-full tw-h-dvh" ref={canvasRef} />
      <div
        className={clsx(
          'tw-fixed tw-top-0 tw-inset-x-0 tw-z-logger tw-p-2 tw-flex tw-items-center tw-justify-center',
          !enableVisualLogger && 'tw-hidden',
        )}
        id={loggerTargetId}
      />
    </div>
  );
};
