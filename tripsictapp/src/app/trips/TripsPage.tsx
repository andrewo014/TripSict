'use client';
import { useState } from 'react';
import TripForm from './TripForm';
import Image from 'next/image';
import styles from './Trip.module.css';
import Link from 'next/link';

interface Trip {
  id: string;
  name: string;
  date: string;
  description: string;
  location: string;
}

const TripsPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  const addTripHandler = (trip: { name: string, date: string, description: string, location: string }) => {
    const newTrip = {
      id: Math.random().toString(),
      ...trip,
    };

    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  const deleteTripHandler = (id: string) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
  };

  const editTripHandler = (id: string) => {
    const tripToEdit = trips.find((trip) => trip.id === id);
    if (tripToEdit) {
      console.log('Edit trip:', tripToEdit);
    }
  };

  return (
    <div className={styles.tripPageContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>TripSict</div>
        <Image 
          src="/Images/triptactLogo.jpg" 
          alt="Triptact Photo Log" 
          width={80} 
          height={80} 
          className={styles.logoImage} 
        />
        <Link href="signin" passHref>
          <button className={styles.signInButton}>Sign In</button>
        </Link>
      </header>

      <h1 className={styles.title}>Manage Your Trip Items</h1>
      <TripForm onAddTrip={addTripHandler} />

      <div className={styles.tripList}>
        <h2 className={styles.tripListTitle}>Trip List</h2>
        {trips.length === 0 ? (
          <p>No trips added yet.</p>
        ) : (
          <ul>
            {trips.map((trip) => (
              <li key={trip.id} className={styles.tripItem}>
                <h3 className={styles.tripItemTitle}>{trip.name}</h3>
                <p className={styles.tripItemText}>{trip.date}</p>
                <p className={styles.tripItemText}>{trip.description}</p>
                <p className={styles.tripItemText}>{trip.location}</p>
                <div className={styles.buttonGroup}>
                  <button onClick={() => editTripHandler(trip.id)} className={styles.editButton}>Edit</button>
                  <button onClick={() => deleteTripHandler(trip.id)} className={styles.deleteButton}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2024 TripSict</p>
      </footer>
    </div>
  );
};

export default TripsPage;
