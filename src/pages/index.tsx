import clsx from 'clsx';
import { FC, useCallback, useEffect, useMemo } from 'react';
import {
  Button,
  CoreStep,
  CoreStepImage,
  Dropdown,
  DropdownItemProps,
  FormField,
  Panel,
  Spinner,
  SplashLogo,
} from '../components';
import { useCamera } from '../hooks';
import { CoreService } from '../services/CoreService';

export const IndexPage: FC = () => {
  const coreService = CoreService.use();
  const isValidSetup = CoreService.selectors.isValidSetup();

  const { videoRef, onCameraInitialize } = useCamera();

  useEffect(() => {
    coreService.start();
  }, []);

  const onProceed = useCallback(() => {
    coreService.saveVehicleParameters();
  }, []);

  const onLoadScene = useCallback(async () => {
    await coreService.loadScene(onCameraInitialize);
  }, [onCameraInitialize]);

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
      <SplashLogo open={coreService.step === 'splash'} onOpened={coreService.loadLookups} />

      <CoreStep open={coreService.step === 'setup'} className="tw-p-6">
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
          <Button disabled={!isValidSetup} onClick={onProceed}>
            Proceed
          </Button>
        </div>
      </CoreStep>
      <CoreStep open={coreService.step === 'scene'} onOpened={onLoadScene} className="tw-p-6">
        <div
          className={clsx(
            'tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-stretch tw-justify-center tw-overflow-hidden',
            coreService.isLoadingScene && 'tw-hidden',
          )}>
          <video className="tw-max-h-dvh tw-w-full tw-h-auto tw-object-contain" autoPlay playsInline ref={videoRef} />
        </div>
        <Spinner open={coreService.isLoadingScene} />
      </CoreStep>

      <CoreStepImage open={coreService.step === 'setup'} />
    </main>
  );
};

export default IndexPage;
