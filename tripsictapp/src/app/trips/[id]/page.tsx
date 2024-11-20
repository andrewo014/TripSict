'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './specificTrip.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface Trip {
  id: string;
  name: string;
  date: string;
  description: string;
  location: string;
  slug: string;
}

interface Place {
  name: string;
  formatted_address: string;
  rating?: number;
}

const TripDetailsPage = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    const dayNumber = date.getDate();
    const suffix =
      dayNumber % 10 === 1 && dayNumber !== 11
        ? 'st'
        : dayNumber % 10 === 2 && dayNumber !== 12
        ? 'nd'
        : dayNumber % 10 === 3 && dayNumber !== 13
        ? 'rd'
        : 'th';

    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const yearNumber = date.getFullYear();
    return `${monthName} ${dayNumber}${suffix}, ${yearNumber}`;
  };

  useEffect(() => {
    // Load trip details from localStorage
    if (id) {
      const storedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
      const tripDetails = storedTrips.find((t: Trip) => t.id === id);
      setTrip(tripDetails || null);
    }
  }, [id]);

  useEffect(() => {
    // Fetch places from the API route
    const fetchPlaces = async () => {
      if (!trip?.location) {
        console.error('Trip location is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/places?query=lodging+in+${encodeURIComponent(trip.location)}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch places: ${response.statusText}`);
        }

        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setLoading(false);
      }
    };

    if (trip) {
      fetchPlaces();
    }
  }, [trip]);

  if (!trip) {
    return <p>Loading trip details...</p>;
  }

  return (
    <main className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.Title}>TripSict</h1>
        <Image
          src="/Images/triptactLogo.jpg"
          alt="Triptact Photo Log"
          width={80}
          height={80}
          className={styles.logoImage}
        />
        <div className={styles.headerButtons}>
          <Link href="/trips" passHref>
            <button className={styles.headerButtonStyle}>My Dashboard</button>
          </Link>
          <Link href="/" passHref>
            <button className={styles.headerButtonStyle}>Log out</button>
          </Link>
        </div>
      </header>

      <div>
        <div className={styles.tripTitleDisplay}>
          <div className={styles.leftInformation}>
            <h1 className={styles.leftInformationBigText}>{trip.name}</h1>
            <h4 className={styles.leftInformationLittleText}>{trip.location}</h4>
            <h4 className={styles.leftInformationDescription}>{trip.description}</h4>
          </div>
          <h1 className={styles.headerTripDate}>{formatDate(trip.date)}</h1>
        </div>
      </div>

      <div className={styles.lodging}>
      <h1 className={styles.lodgingTitle}>
         Your Lodging
        </h1>
        <h1 className={styles.lodgingTitle}>
          Lodging options in {trip.location}
        </h1>
        <div>
          {loading ? (
            <h1 className={styles.loading}>Loading lodging options...</h1>
          ) : places.length > 0 ? (
            places.map((place, index) => (
              <div key={index} className={styles.lodgingCard}>
                <h3 className={styles.topBanner}>{place.name}</h3>
                <div className={styles.bottomInfo}>
                <p>{place.formatted_address}</p>
                <p>Rating: {place.rating ? `${place.rating}/5 ⭐` : 'N/A'}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No lodging options found for {trip.location}.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default TripDetailsPage;
