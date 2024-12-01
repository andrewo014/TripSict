
'use client';

import { SessionProvider } from 'next-auth/react'; 
import AttractionsPage from './AttractionsPage';

const AttractionsPageWrapper = () => {
  return (
    <SessionProvider>
      <AttractionsPage />
    </SessionProvider>
  );
};

export default AttractionsPageWrapper;
