import { FC } from 'react';
import { SplashLogo } from '../components';

export const IndexPage: FC = () => {
  return (
    <main className="tw-h-screen tw-flex tw-flex-col tw-items-stretch tw-justify-center">
      <SplashLogo />
    </main>
  );
};

export default IndexPage;
