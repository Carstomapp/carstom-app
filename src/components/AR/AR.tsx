import clsx from 'clsx';
import { FC, RefObject, useEffect } from 'react';
import * as THREE from 'three';
import { NNCoordinates } from '../../api/types';

interface Props {
  hidden?: boolean;
  sceneRef: RefObject<THREE.Scene | undefined>;
  cameraRef: RefObject<THREE.Camera | undefined>;
  rendererRef: RefObject<THREE.WebGLRenderer | undefined>;
  coordinates: NNCoordinates[];
  canvasRef?: RefObject<HTMLCanvasElement>;
}

export const AR: FC<Props> = props => {
  const { hidden, sceneRef, cameraRef, rendererRef, coordinates, canvasRef } = props;

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
      cameraRef.current.position.z = 5;

      function animate() {
        rendererRef.current!.render(sceneRef.current!, cameraRef.current!);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
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
    </div>
  );
};
