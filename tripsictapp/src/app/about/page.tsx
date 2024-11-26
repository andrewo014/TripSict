'use client';
import styles from './about.module.css';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage: React.FC = () => {
  return (
    <main className={styles.aboutPageContainer}>
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
        <h1>Your Guide to Seamless Getaways</h1>
        <p className={styles.heroText}>
          Discover, plan, and embark on your dream adventures with TripSict, the perfect tool for stress-free travel planning.
        </p>
        <Link href="signup">
        <button className={styles.getStartedButton}>Get Started</button>
        </Link>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionHeader}>What is TripSict?</h2>
        <p>
          TripSict is your ultimate travel companion, designed to simplify the planning process and enhance every aspect of your journey. Whether you're escaping to the beach, exploring a bustling city, or retreating to the mountains, TripSict provides the tools and information you need for an unforgettable trip.
        </p>

        <h2 className={styles.sectionHeader}>Features You'll Love</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Personalized Itineraries</h3>
            <p>Create a custom itinerary tailored to your interests and travel style.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Curated Lodging Options</h3>
            <p>Explore detailed reviews, photos, and amenities to find the perfect place to stay.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Dining Recommendations</h3>
            <p>Discover local favorites and fine dining options to satisfy every craving.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Top Attractions</h3>
            <p>Find must-see landmarks and hidden gems to make your trip truly memorable.</p>
          </div>
        </div>

        <h2 className={styles.sectionHeader}>Why Choose TripSict?</h2>
        <p>
          With up-to-date information on lodging, dining, and attractions, TripSict makes planning simple and stress-free. We bring together expert recommendations, detailed guides, and user-friendly tools to ensure every aspect of your journey is perfect. Let us be your guide to the world’s most exciting destinations.
        </p>
        <Link href="signup">
        <button className={styles.exploreButton}>Explore TripSict</button>
        </Link>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2024 TripSict. Plan Your Adventure!</p>
      </footer>
    </main>
  );
};

export default AboutPage;
