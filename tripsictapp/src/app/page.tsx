import Image from "next/image";

import Link from "next/link";
import Homepage from "./homepage/HomePage";
import TripsPage from "./trips/page";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
   <Homepage/>
  );
}
