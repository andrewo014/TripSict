// pages/tripsWrapperPage.tsx
import React from "react";
import { SessionProvider } from "next-auth/react";
import FlightsPage from "./FlightsPage"; // Adjust the import path if necessary

const  FlightsPageWrapper: React.FC = () => {
  return (
    <SessionProvider>
      < FlightsPage />
    </SessionProvider>
  );
};

export default  FlightsPageWrapper;
