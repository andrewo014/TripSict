"use client"; // Ensure client-side rendering

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./Trip.module.css";

const LogoutButton: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <button onClick={() => signOut()} className={styles.logOutButton}>
          Log out
        </button>
      ) : (
        <Link href="/signin">
          <button className={styles.signInButton}>Sign In</button>
        </Link>
      )}
    </>
  );
};

export default LogoutButton;
