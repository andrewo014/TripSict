
'use client';

import { SessionProvider } from 'next-auth/react'; 
import ExplorePage from './ExplorePage';

const ExplorePageWrapper = () => {
  return (
    <SessionProvider>
      <ExplorePage/>
    </SessionProvider>
  );
};

export default ExplorePageWrapper;
