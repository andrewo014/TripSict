'use client'; // Mark the file as a client component

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Trip {
  id: string;
  name: string;
  date: string;
  description: string;
  location: string;
}

const TripDetailsPage = () => {
  const { id } = useParams(); // Get the dynamic ID from the route
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    console.log('Fetching trip details for ID:', id);
    if (id) {
      const storedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
      console.log('Stored trips:', storedTrips);
      const tripDetails = storedTrips.find((t: Trip) => t.id === id);
      console.log('Trip details found:', tripDetails);
      setTrip(tripDetails || null);
    }
  }, [id]);

  if (!trip) {
    return <p>Loading...</p>; // Fallback while data is loading
  }

  return (
    <div>
      <h1>{trip.name}</h1>
      <p><strong>Date:</strong> {trip.date}</p>
      <p><strong>Location:</strong> {trip.location}</p>
      <p><strong>Description:</strong> {trip.description}</p>
    </div>
  );
};

export default TripDetailsPage;
