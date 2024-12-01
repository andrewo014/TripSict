
'use client';

import { SessionProvider } from 'next-auth/react'; 
import DiningPage from './DiningPage';

const DiningPageWrapper = () => {
  return (
    <SessionProvider>
      <DiningPage/>
    </SessionProvider>
  );
};

export default DiningPageWrapper;
