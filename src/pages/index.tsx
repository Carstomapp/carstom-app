import { FC, useCallback, useEffect } from 'react';
import { Button, CoreStep, CoreStepImage, Dropdown, FormField, Panel, SplashLogo } from '../components';
import { CoreService } from '../services/CoreService';

export const IndexPage: FC = () => {
  const coreService = CoreService.use();
  const isValidSetup = CoreService.selectors.isValidSetup();

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
    <main className="tw-h-dvh tw-relative tw-overflow-hidden">
      <SplashLogo open={coreService.step === 'splash'} onOpened={onSplashOpened} />

      <CoreStep open={coreService.step === 'setup'} className="tw-p-6">
        <Panel head="Select your car" className="tw-mt-8">
          <p>We need to ensure that the wheel selection matches your car</p>
          <FormField>
            <Dropdown
              placeholder="Make"
              items={[
                { text: 'AUDI', value: 'AUDI' },
                { text: 'BMW', value: 'BMW' },
                { text: 'MERCEDES-BENZ', value: 'MERCEDES-BENZ' },
                { text: 'TOYOTA', value: 'TOYOTA' },
              ]}
              value={coreService.make}
              onChange={coreService.setMake}
            />
          </FormField>
          <FormField>
            <Dropdown
              placeholder="Model"
              items={[{ text: 'Test', value: 'Test' }]}
              value={coreService.model}
              onChange={coreService.setModel}
            />
          </FormField>
          <FormField>
            <Dropdown
              placeholder="Year"
              items={[{ text: '2004', value: '2004' }]}
              value={coreService.year}
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
      <CoreStep open={coreService.step === 'spinner'} className="tw-p-6">
        Spinner
      </CoreStep>

      <CoreStepImage open={coreService.step === 'setup'} />
    </main>
  );
};

export default IndexPage;
