'use client';
import styles from './founders.module.css';
import Image from 'next/image';
import Link from 'next/link';

const FoundersPage: React.FC = () => {
  return (
    <main className={styles.foundersPageContainer}>
      <header className={styles.navbar}>
        <h1 className={styles.title}>TripSict</h1>
        <Image 
          src="/Images/triptactLogo.jpg"
          alt="Triptact Photo Logo"
          width={80}
          height={80}
          className={styles.logoImage}
        />
        <Link href="/">
          <button className={styles.homeButton}>Home</button>
        </Link>
      </header>

      <div className={styles.heroSection}>
        <h1>Meet the Founders</h1>
        <p className={styles.heroText}>
          The minds behind TripSict, bringing you seamless travel planning and unforgettable adventures.
        </p>
      </div>

      <div className={styles.contentSection}>
        <ul className={styles.foundersList}>
          <li className={styles.founder}>Andrew Onwuzulike</li>
          <li className={styles.founder}>Justin Olawole</li>
          <li className={styles.founder}>Avanie Baptiste</li>
          <li className={styles.founder}>Gilbert Baraka</li>
        </ul>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2024 TripSict. Plan Your Adventure!</p>
      </footer>
    </main>
  );
};

export default FoundersPage;
