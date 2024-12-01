
'use client';

import { SessionProvider } from 'next-auth/react';
import TripDetailsPage from './TripDetailsPage'; 

const TripDetailsPageWrapper = () => {
  return (
    <SessionProvider>
      <TripDetailsPage />
    </SessionProvider>
  );
};

export default TripDetailsPageWrapper;
