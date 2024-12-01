
import React from "react";
import { SessionProvider } from "next-auth/react";
import TripsPage from "./TripsPage"; 

const TripsWrapperPage: React.FC = () => {
  return (
    <SessionProvider>
      <TripsPage />
    </SessionProvider>
  );
};

export default TripsWrapperPage;
