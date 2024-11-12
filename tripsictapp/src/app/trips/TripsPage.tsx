'use client'; // Add this directive at the top of your file
import { useState } from 'react';
import TripForm from './TripForm';

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
      // You can implement your edit form logic here
      console.log('Edit trip:', tripToEdit);
    }
  };

  return (
    <div>
      <h1>Manage Your Trip Items</h1>
      <TripForm onAddTrip={addTripHandler} />

      <div>
        <h2>Trip List</h2>
        {trips.length === 0 ? (
          <p>No trips added yet.</p>
        ) : (
          <ul>
            {trips.map((trip) => (
              <li key={trip.id}>
                <h3>{trip.name}</h3>
                <p>{trip.date}</p>
                <p>{trip.description}</p>
                <p>{trip.location}</p>
                <button onClick={() => editTripHandler(trip.id)}>Edit</button>
                <button onClick={() => deleteTripHandler(trip.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
