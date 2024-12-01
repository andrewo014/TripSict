// pages/tripsWrapperPage.tsx
import React from "react";
import { SessionProvider } from "next-auth/react";
import TripsPage from "./TripsPage"; // Adjust the import path if necessary

const TripsWrapperPage: React.FC = () => {
  return (
    <SessionProvider>
      <TripsPage />
    </SessionProvider>
  );
};

export default TripsWrapperPage;
