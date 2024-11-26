'use client';
import { useState } from 'react';
import styles from './tips.module.css';
import Image from 'next/image';
import Link from 'next/link';

const tipsPage: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const planningTips = [
    "Start planning early to secure the best deals on flights and accommodations.",
    "Create a detailed itinerary but allow room for spontaneity.",
    "Research local customs and culture to respect your destination.",
    "Pack light but bring essentials, including a first-aid kit and travel-sized toiletries.",
    "Use apps and tools to organize your trip and track expenses.",
  ];

  const additionalTips = [
    "Invest in travel insurance for peace of mind.",
    "Check weather forecasts to pack appropriately.",
    "Learn a few basic phrases in the local language.",
    "Notify your bank about your travel plans to avoid card issues.",
    "Stay hydrated and prioritize self-care while traveling.",
  ];

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <main className={styles.inspiredPageContainer}>
      <header className={styles.navbar}>
        <h1 className={styles.title}>TripSict</h1>
        <Image 
          src="/Images/triptactLogo.jpg"
          alt="Triptact Photo Logo"
          width={80}
          height={80}
          className={styles.logoImage}
        />
        <Link href='/'>
          <button className={styles.homeButton}>Home</button>
        </Link>
      </header>

      <div className={styles.top}>Travel Planning Tips</div>

      <div className={styles.content}>
        <h1>Your Ultimate Guide to Travel Planning</h1>
        <ul className={styles.tipsList}>
          {planningTips.map((tip, index) => (
            <li key={index} className={styles.tipItem}>{tip}</li>
          ))}
        </ul>
        {showMore && (
          <ul className={styles.moreTips}>
            {additionalTips.map((tip, index) => (
              <li key={index} className={styles.tipItem}>{tip}</li>
            ))}
          </ul>
        )}
        <button onClick={toggleShowMore} className={styles.toggleButton}>
          {showMore ? 'Show Less' : 'More Tips'}
        </button>
      </div>

      <footer className={styles.footer}>
      </footer>
    </main>
  );
};

export default tipsPage;
