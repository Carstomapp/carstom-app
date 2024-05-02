import { FC, useCallback, useEffect } from 'react';
import { Button, CoreStep, Panel, SplashLogo } from '../components';
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
    <main className="tw-h-dvh tw-flex tw-flex-col tw-items-stretch tw-justify-center">
      <SplashLogo open={coreService.step === 'splash'} onOpened={onSplashOpened} />
      <CoreStep open={coreService.step === 'setup'} className="tw-p-6">
        <Panel head="Select your car">
          <p>We need to ensure that the wheel selection matches your car</p>
        </Panel>
        <Button onClick={onProceed}>Proceed</Button>
      </CoreStep>
    </main>
  );
};

export default IndexPage;
