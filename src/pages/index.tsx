import { FC, useCallback, useEffect } from 'react';
import { Button, CoreStep, CoreStepImage, Dropdown, FormField, Panel, SplashLogo } from '../components';
import { useCoreService } from '../services/CoreService';

export const IndexPage: FC = () => {
  const coreService = useCoreService();

  useEffect(() => {
    coreService.start();
  }, []);

  const onSplashOpened = useCallback(async () => {
    await coreService.loadLookups();
  }, []);

  const onProceed = useCallback(() => {
    coreService.saveVehicleParameters();
  }, []);

  return (
    <main className="tw-h-dvh tw-relative">
      <SplashLogo open={coreService.step === 'splash'} onOpened={onSplashOpened} />

      <CoreStep open={coreService.step === 'setup'} className="tw-p-6">
        <Panel head="Select your car" className="tw-mt-8">
          <p>We need to ensure that the wheel selection matches your car</p>
          <FormField>
            <Dropdown placeholder="Make" />
          </FormField>
          <FormField>
            <Dropdown placeholder="Model" />
          </FormField>
          <FormField>
            <Dropdown placeholder="Year" />
          </FormField>
        </Panel>
        <div className="tw-flex tw-items-center tw-justify-end tw-mt-4">
          <Button onClick={onProceed}>Proceed</Button>
        </div>
      </CoreStep>
      <CoreStep open={coreService.step === 'spinner'} className="tw-p-6">
        Spinner
      </CoreStep>

      <CoreStepImage open={coreService.step === 'setup'} />
    </main>
  );
};

export default IndexPage;
