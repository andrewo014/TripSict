'use client';
import { useState } from 'react';
import styles from './helpCenter.module.css';
import Image from 'next/image';
import Link from 'next/link';

const helpCenter: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    { question: "What is TripSict?", answer: "TripSict is your ultimate travel companion, helping you plan seamless getaways with curated information on lodging, dining, and attractions." },
    { question: "How do I use TripSict?", answer: "Simply sign in or register, explore our travel planning tools, and create your personalized itinerary with ease." },
    { question: "Is TripSict free to use?", answer: "Yes, TripSict is free to use with optional premium features for enhanced planning." },
    { question: "Can I save my trip plans?", answer: "Absolutely! TripSict allows you to save your trips and access them anytime." },
    { question: "Who can I contact for support?", answer: "You can reach out to our support team via the 'Report an Issue' page or email us at support@tripsict.com." },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion((prev) => (prev === index ? null : index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={styles.faqPageContainer}>
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
        <h1 className={styles.sectionHeader}>Frequently Asked Questions</h1>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button onClick={() => toggleQuestion(index)} className={styles.questionButton}>
                {faq.question}
              </button>
              {openQuestion === index && <p className={styles.answer}>{faq.answer}</p>}
            </div>
          ))}
        </div>

        <h2 className={styles.sectionHeader}>Ask Your Own Question</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="question" className={styles.label}>
              Your Question
            </label>
            <textarea
              id="question"
              name="question"
              placeholder="Type your question here..."
              className={styles.textarea}
              required
            />
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        ) : (
          <div className={styles.thankYouMessage}>
            <h1>Thank You!</h1>
            <p>Your question has been submitted.</p>
            <p>We’ll review it and get back to you soon!</p>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2024 TripSict. Plan Your Adventure!</p>
      </footer>
    </main>
  );
};

export default helpCenter;
