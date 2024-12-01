'use client';
import { useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react'; // Importing useSession hook
import FlightForm from './FlightForm';
import styles from './FlightsPage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '../trips/LogOutButton';

interface Flight {
  airline: ReactNode;
  id: string;
  flightNumber: string;
  gate: string;
  departureTime: string;
  arrivalTime: string;
  description?: string;
}

const FlightsPage: React.FC = () => {
  const { data: session } = useSession(); // Get session data
  const [flights, setFlights] = useState<Flight[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editFlight, setEditFlight] = useState<Flight | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedFlights = JSON.parse(localStorage.getItem('flights') || '[]');
    setFlights(savedFlights);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addFlightHandler = (flight: Flight) => {
    if (!session) return; // If not logged in, do nothing

    if (editFlight) {
      const updatedFlights = flights.map((f) =>
        f.id === editFlight.id ? { ...editFlight, ...flight } : f
      );
      localStorage.setItem('flights', JSON.stringify(updatedFlights));
      setFlights(updatedFlights);
      setEditFlight(null);
    } else {
      const { id: _, ...flightWithoutId } = flight; // Exclude id if it exists
      const newFlight = { id: Math.random().toString(), ...flightWithoutId };
      const updatedFlights = [...flights, newFlight];
      localStorage.setItem('flights', JSON.stringify(updatedFlights));
      setFlights(updatedFlights);
    }
    setShowForm(false);
  };

  const deleteFlightHandler = (id: string) => {
    if (!session) return; // If not logged in, do nothing

    const updatedFlights = flights.filter((flight) => flight.id !== id);
    localStorage.setItem('flights', JSON.stringify(updatedFlights));
    setFlights(updatedFlights);
  };

  const editFlightHandler = (id: string) => {
    if (!session) return; // If not logged in, do nothing

    const flightToEdit = flights.find((flight) => flight.id === id);
    if (flightToEdit) {
      setEditFlight(flightToEdit);
      setShowForm(true);
    }
  };

  const toggleFormVisibility = () => {
    if (editFlight) setEditFlight(null);
    setShowForm((prev) => !prev);
  };

  return (
    <main className={styles.flightsPage}>
      <header className={styles.pageHeader}>
        <div className={styles.titleButton}>
          <button onClick={toggleSidebar} className={styles.sidebarToggleButton}>
            <Image
              src="/Images/hamburgerMenu.png"
              alt="Menu"
              width={24}
              height={24}
            />
          </button>
          <h1 className={styles.hamburgerTitle}>TripSict</h1>
        </div>
        <Image
          src="/Images/triptactLogo.jpg"
          alt="Triptact Photo Logo"
          width={80}
          height={80}
          className={styles.logoImage}
        />
        <div className={styles.headerButtons}>
          <Link href="/trips" passHref>
            <button className={styles.headerButtonStyle}>My Dashboard</button>
          </Link>
          <LogoutButton />
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
      >
        <button onClick={toggleSidebar} className={styles.closeButton}>
          X
        </button>

        <div className={styles.sideBarWork}>
          <Image
            src="/Images/triptactLogo.jpg"
            alt="Triptact Photo Log"
            width={80}
            height={80}
            className={styles.sideBarLogo}
          />
          <h1 className={styles.sideBarTitle}>TripSict</h1>
        </div>

        <div className={styles.sidebarButtons}>
          <Link href="trips" passHref>
            <button className={styles.sidebarButton}>
              <Image
                src="/Images/palmTreeIcon.png"
                alt="Menu"
                width={24}
                height={24}
                style={{ marginRight: '8px' }}
              />
              <p>Trips</p>
            </button>
          </Link>

          <Link href="flights">
            <button className={styles.currentPageButton}>
              <Image
                src="/Images/planeIcon.png"
                alt="Menu"
                width={24}
                height={24}
                style={{ marginRight: '8px' }}
              />
              <p>Flights</p>
            </button>
          </Link>
        </div>
      </div>

      <h4 className={styles.title}>Your Flights</h4>
      <div className={styles.flightContainer}>
        {session ? (
          <button className={styles.addFlightButton} onClick={toggleFormVisibility}>
            {showForm ? 'Cancel' : editFlight ? 'Edit Flight' : 'Add Flight'}
          </button>
        ) : (
          <p>Please log in to add, edit, or delete flights.</p>
        )}
        {showForm && <FlightForm onAddFlight={addFlightHandler} editFlight={editFlight} />}
        <ul>
          {flights.map((flight) => (
            <li key={flight.id} className={styles.flightItem}>
              <div>
                <h3>{flight.airline}</h3>
                <p>Flight number: {flight.flightNumber}</p>
                <p>Gate: {flight.gate}</p>
                <p>Departure: {flight.departureTime}</p>
                <p>Arrival: {flight.arrivalTime}</p>
                <p>{flight.description}</p>
              </div>
              {session && (
                <>
                  <button onClick={() => editFlightHandler(flight.id)}>Edit</button>
                  <button onClick={() => deleteFlightHandler(flight.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default FlightsPage;
