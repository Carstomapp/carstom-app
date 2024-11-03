import clsx from 'clsx';
import { FC, useCallback, useEffect, useMemo } from 'react';
import {
  AR,
  Button,
  Camera,
  CoreStep,
  CoreStepImage,
  Dropdown,
  DropdownItemProps,
  FormField,
  LayoutHeader,
  LayoutMain,
  Panel,
  Spinner,
  SplashLogo,
} from '../components';
import { useAR, useCamera } from '../hooks';
import { ARService } from '../services/ARService';
import { CoreService } from '../services/CoreService';

export const IndexPage: FC = () => {
  const coreService = CoreService.use();
  const isValidSetup = CoreService.selectors.isValidSetup();

  const arService = ARService.use();

  const { videoRef, canvasRef, initializeCamera, cleanupCamera, captureCameraFrame } = useCamera({
    onFrame: arService.processFrame,
  });

  const { arCanvasRef, sceneRef, cameraRef, rendererRef, initializeScene } = useAR();

  useEffect(() => {
    coreService.start();
  }, []);

  const onProceed = useCallback(() => {
    coreService.saveVehicleParameters();
  }, []);

  const onStart = useCallback(async () => {
    await arService.ensurePermissions();
    await captureCameraFrame();
  }, [captureCameraFrame]);

  const onLoadScene = useCallback(async () => {
    await coreService.loadScene(initializeCamera);
  }, [initializeCamera]);

  const onCameraReady = useCallback(async () => {
    coreService.showLayout();
    await initializeScene();
  }, [initializeScene]);

  const onReturnToSetup = useCallback(() => {
    cleanupCamera();
    coreService.returnToSetup();
  }, [cleanupCamera]);

  const brands = useMemo<DropdownItemProps[]>(
    () => coreService.brands.map(brand => ({ value: brand.id, text: brand.title })),
    [coreService.brands],
  );

  const models = useMemo<DropdownItemProps[]>(
    () => coreService.models.map(model => ({ value: model.id, text: model.title })),
    [coreService.models],
  );

  const years = useMemo<DropdownItemProps[]>(
    () => coreService.years.map(year => ({ value: year.id, text: year.title })),
    [coreService.years],
  );

  return (
    <main className="tw-h-dvh tw-relative tw-overflow-hidden">
      <SplashLogo open={coreService.step === 'splash'} onOpened={coreService.loadSetup} />

      <CoreStep open={coreService.step === 'setup'} back={coreService.isReturn} className="tw-p-6">
        <Panel head="Select your car" className="tw-mt-8">
          <p>We need to ensure that the wheel selection matches your car</p>
          <FormField>
            <Dropdown placeholder="Make" items={brands} value={coreService.brand} onChange={coreService.setBrand} />
          </FormField>
          <FormField>
            <Dropdown
              placeholder="Model"
              items={models}
              value={coreService.model}
              disabled={!coreService.brand}
              loading={coreService.isLoadingModels}
              onChange={coreService.setModel}
            />
          </FormField>
          <FormField>
            <Dropdown
              placeholder="Year"
              items={years}
              value={coreService.year}
              disabled={!coreService.model}
              loading={coreService.isLoadingYears}
              onChange={coreService.setYear}
            />
          </FormField>
        </Panel>
        <div className="tw-flex tw-items-center tw-justify-end tw-mt-4">
          <Button style="primary" disabled={!isValidSetup} onClick={onProceed}>
            Proceed
          </Button>
        </div>
      </CoreStep>
      <CoreStep
        open={coreService.step === 'scene'}
        back={coreService.isReturn}
        onOpened={onLoadScene}
        className="tw-p-6">
        <Camera
          hidden={coreService.isCameraHidden}
          videoRef={videoRef}
          canvasRef={canvasRef}
          onCameraReady={onCameraReady}
        />
        <AR
          hidden={coreService.isCameraHidden}
          enableVisualLogger
          sceneRef={sceneRef}
          cameraRef={cameraRef}
          rendererRef={rendererRef}
          coordinates={[{ x: 0, y: 0 }]}
          // TODO: Restore
          //coordinates={arService.coordinates}
          canvasRef={arCanvasRef}
        />
        <LayoutHeader open={coreService.isShowingLayout} onSetupClick={onReturnToSetup} />
        <LayoutMain open={coreService.isShowingLayout}>
          {arService.frameStatus === 'none' && (
            <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-gap-4">
              <p className="tw-text-sm tw-text-center tw-m-0 tw-font-medium">
                Point your camera at the car,
                <br /> ensuring the wheels are in view
              </p>
              <button
                className={clsx(
                  'tw-rounded-full tw-w-24 tw-h-24 tw-bg-background tw-text-primary tw-border-4 tw-border-solid tw-uppercase tw-font-medium tw-text-lg tw-outline-dashed tw-outline-2 tw-outline-offset-2 tw-outline-border active:tw-border-white active:tw-text-white tw-flex tw-items-center tw-justify-center',
                  {
                    'tw-border-primary': !arService.isProcessing,
                    'tw-border-white': arService.isProcessing,
                  },
                )}
                disabled={arService.isProcessing}
                onClick={onStart}>
                {arService.isProcessing ? (
                  <div className="tw-rounded-full tw-border tw-border-solid tw-border-transparent tw-border-r-white tw-animate-spinner-dropdown tw-w-16 tw-h-16" />
                ) : (
                  'Start'
                )}
              </button>
            </div>
          )}
        </LayoutMain>
        <Spinner open={coreService.isLoadingScene} />
      </CoreStep>

      <CoreStepImage open={coreService.step === 'setup'} />
    </main>
  );
};

export default IndexPage;
