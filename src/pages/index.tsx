import { FC, useCallback, useEffect } from 'react';
import { SplashLogo } from '../components';
import { useCoreService } from '../services/CoreService';

export const IndexPage: FC = () => {
  const coreService = useCoreService();

  useEffect(() => {
    coreService.openSplash();
  }, []);

  const onSplashOpened = useCallback(async () => {
    await coreService.loadLookups();
  }, []);

  return (
    <main className="tw-h-dvh tw-flex tw-flex-col tw-items-stretch tw-justify-center">
      <SplashLogo open={coreService.splashOpen} onOpened={onSplashOpened} />
    </main>
  );
};

export default IndexPage;
