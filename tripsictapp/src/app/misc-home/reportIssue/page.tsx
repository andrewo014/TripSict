'use client';
import { useState } from 'react';
import styles from './reportIssue.module.css';
import Image from 'next/image';
import Link from 'next/link';

const ReportIssuePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={styles.reportPageContainer}>
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

      <div className={styles.contentSection}>
        {!submitted ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.formHeader}>Report an Issue</h1>
            <label htmlFor="name" className={styles.label}>
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className={styles.input}
              required
            />
            <label htmlFor="email" className={styles.label}>
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={styles.input}
              required
            />
            <label htmlFor="issue" className={styles.label}>
              Describe the Issue
            </label>
            <textarea
              id="issue"
              name="issue"
              placeholder="Provide details about the issue"
              className={styles.textarea}
              required
            />
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        ) : (
          <div className={styles.thankYouMessage}>
            <h1>Thank You!</h1>
            <p>Your submission has been received.</p>
            <p>This issue will be looked into!</p>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2024 TripSict. Plan Your Adventure!</p>
      </footer>
    </main>
  );
};

export default ReportIssuePage;
