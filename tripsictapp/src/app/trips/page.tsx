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
 const [showForm, setShowForm] = useState(false);
 const [editTrip, setEditTrip] = useState<Trip | null>(null);
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 const toggleSidebar = () => {
   setIsSidebarOpen(!isSidebarOpen);
 };

 const addTripHandler = (trip: { id?: string; name: string; date: string; description: string; location: string }) => {
   if (editTrip) {
     setTrips((prevTrips) =>
       prevTrips.map((t) => (t.id === editTrip.id ? { ...t, ...trip, id: editTrip.id } : t))
     );
     setEditTrip(null);
   } else {
     const newTrip = { id: Math.random().toString(), ...trip };
     setTrips((prevTrips) => [...prevTrips, newTrip]);
   }
   setShowForm(false);
 };

 const deleteTripHandler = (id: string) => {
   console.log("Deleting trip with ID:", id);  // Debug log to ensure correct ID
   setTrips((prevTrips) => {
     const updatedTrips = prevTrips.filter((trip) => trip.id !== id);
     console.log("Updated trips:", updatedTrips);  // Check the updated state
     return updatedTrips;
   });
 };

 const editTripHandler = (id: string) => {
   const tripToEdit = trips.find((trip) => trip.id === id);
   if (tripToEdit) {
     setEditTrip(tripToEdit);
     setShowForm(true);
   }
 };

 const toggleFormVisibility = () => {
   if (editTrip) {
     setEditTrip(null);
   }
   setShowForm((prevShowForm) => !prevShowForm);
 };

 return (
   <main className={styles.tripPageContainer}>
     {/* Rest of the UI remains unchanged */}
   </main>
 );
};

export default TripsPage;
