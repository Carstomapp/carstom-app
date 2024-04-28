import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { SplashLogo } from '../components';

export const IndexPage: FC = () => {
  const [splashOpen, setSplashOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setSplashOpen(true);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    };
  }, []);

  const onSplashOpened = useCallback(() => {
    timeoutRef.current = setTimeout(() => setSplashOpen(false), 3000);
  }, [setSplashOpen]);

  return (
    <main className="tw-h-dvh tw-flex tw-flex-col tw-items-stretch tw-justify-center">
      <SplashLogo open={splashOpen} onOpened={onSplashOpened} />
    </main>
  );
};

export default IndexPage;
