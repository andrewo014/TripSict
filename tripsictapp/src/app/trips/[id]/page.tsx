// app/tripDetailsPageWrapper.tsx
'use client';

import { SessionProvider } from 'next-auth/react'; // Import the SessionProvider
import TripDetailsPage from './TripDetailsPage'; // Import your TripDetailsPage component

const TripDetailsPageWrapper = () => {
  return (
    <SessionProvider>
      <TripDetailsPage />
    </SessionProvider>
  );
};

export default TripDetailsPageWrapper;
