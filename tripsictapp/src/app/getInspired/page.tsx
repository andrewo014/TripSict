'use client';
import { useState, useEffect } from 'react';
import styles from './GetInspiredPage.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface VacationImage {
  id: string;
  title: string;
  url: string;
}

const GetInspiredPage: React.FC = () => {
  const [images, setImages] = useState<VacationImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const url = 'https://api.unsplash.com/photos/random?query=vacation&count=10&client_id=nOJOHddYvMNkUEB1Kz36xF7mYY7Fdr8W-tLFht23cYc';

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          id: item.id,
          title: item.description || item.alt_description || 'Vacation Idea',
          url: item.urls?.regular || '',
        }));

        setImages(formattedData);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching images:', error.message);
        setError('Failed to fetch images. Please try again later.');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <main className={styles.inspiredPageContainer}>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.inspiredPageContainer}>
        <p>{error}</p>
      </main>
    );
  }

  if (images.length === 0) {
    return (
      <main className={styles.inspiredPageContainer}>
        <p>No images available. Please try again later.</p>
      </main>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <main className={styles.inspiredPageContainer}>
      <header className={styles.navbar}>
        <h1 className={styles.title}>TripSict</h1>
        <Image 
          src="/Images/triptactLogo.jpg"
          alt="Triptact Photo Log"
          width={80}
          height={80}
          className={styles.logoImage}
        />
        <Link href='/'>
          <button className={styles.homeButton}>Home</button>
        </Link>
      </header>

      <div className={styles.topTitle}>Get Inspired!</div>
      <p>Can't figure out where you'd like to explore next? Maybe we can help!</p>

      <div className={styles.imageFrontBack}>

      <button onClick={handlePrevious} className={styles.controlButton}>
        &#8592;
        </button>

      <div className={styles.imageContainer}>
        {currentImage.url ? (
          <img src={currentImage.url} alt={currentImage.title} className={styles.image} />
        ) : (
          <p>No image available</p>
        )}
        <p className={styles.imageTitle}>{currentImage.title}</p>
      </div>

      <button onClick={handleNext} className={styles.controlButton}>
      &#8594;
        </button>
        </div>
      <footer className={styles.footer}>
        <p>Get Inspired</p>
      </footer>
    </main>
  );
};

export default GetInspiredPage;
