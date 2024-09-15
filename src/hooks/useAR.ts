import { RefObject, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { Logger } from '../utils';

interface Result {
  arCanvasRef: RefObject<HTMLCanvasElement>;
  sceneRef: RefObject<THREE.Scene | undefined>;
  cameraRef: RefObject<THREE.Camera | undefined>;
  rendererRef: RefObject<THREE.WebGLRenderer | undefined>;
  initializeScene(): Promise<void>;
}

export function useAR(): Result {
  const arCanvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.Camera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  const initializeScene = useCallback(async () => {
    if (!arCanvasRef.current) {
      return;
    }

    Logger.info('Start 3D scene initialization');

    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    rendererRef.current = new THREE.WebGLRenderer({
      alpha: true,
      preserveDrawingBuffer: true,
      canvas: arCanvasRef.current,
    });

    rendererRef.current.setClearColor(0x000000, 0);
    rendererRef.current.setSize(width, height);

    Logger.info('End 3D scene initialization');
  }, []);

  return {
    arCanvasRef,
    sceneRef,
    cameraRef,
    rendererRef,
    initializeScene,
  };
}
