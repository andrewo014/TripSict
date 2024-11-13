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

  // Add new or update existing trip
  const addTripHandler = (trip: { id?: string; name: string; date: string; description: string; location: string }) => {
    setTrips((prevTrips) => {
      if (editTrip) {
        return prevTrips.map((t) =>
          t.id === editTrip.id ? { ...t, ...trip, id: editTrip.id } : t
        );
      } else {
        const newTrip = { id: Math.random().toString(), ...trip }; // Unique ID for new trip
        return [...prevTrips, newTrip];
      }
    });
    setEditTrip(null); // Clear edit state
    setShowForm(false); // Hide the form after submitting
  };

  // Delete trip by ID
  const deleteTripHandler = (id: string) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
  };

  // Edit trip by ID
  const editTripHandler = (id: string) => {
    const tripToEdit = trips.find((trip) => trip.id === id);
    if (tripToEdit) {
      setEditTrip(tripToEdit);
      setShowForm(true); // Show form for editing
    }
  };

  // Toggle the form visibility
  const toggleFormVisibility = () => {
    if (editTrip) {
      setEditTrip(null); // If editing, clear it
    }
    setShowForm((prevShowForm) => !prevShowForm); // Toggle visibility of form
  };

  return (
    <main className={styles.tripPageContainer}>
      <header className={styles.navbar}>
        <button onClick={toggleSidebar} className={styles.sidebarToggleButton}>
          {isSidebarOpen ? 'Close Menu' : 'Menu'}
        </button>
        <Image 
          src="/Images/triptactLogo.jpg" 
          alt="Triptact Photo Log" 
          width={80} 
          height={80} 
          className={styles.logoImage} 
        />
        <Link href="/" passHref>
          <button className={styles.logOutButton}>Log out</button>
        </Link>
      </header>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <button onClick={toggleSidebar} className={styles.closeButton}>X</button>
        
        <Image 
          src="/Images/triptactLogo.jpg" 
          alt="Triptact Photo Log" 
          width={80} 
          height={80} 
          className={styles.sideBarLogo} 
        />
        
        <div className={styles.sidebarButtons}>
          <button className={styles.sidebarButton}>Trips</button>
          <button className={styles.sidebarButton}>Notes</button>
          <button className={styles.sidebarButton}>My Flights</button>
          <button className={styles.sidebarButton}>Ride Share</button>
        </div>
      </div>

      <h1 className={styles.welcome}>Welcome Back!</h1>

      <h4 className={styles.title}>My Trips </h4>

      <div className={styles.nonHeaderContent}>
        <button onClick={toggleFormVisibility} className={styles.addTripButton}>
          {showForm ? 'Cancel' : editTrip ? 'Edit Trip' : 'Add Trip'}
        </button>

        {showForm && <TripForm onAddTrip={addTripHandler} editTrip={editTrip} />}

        <div className={styles.tripList}>
          {trips.length === 0 ? (
            <div className={styles.noTrips}>
              <p>No trips added yet.</p>
            </div>
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
      </div>
             
      <footer className={styles.footer}>
          <p>&copy; 2024 TripSict</p>
      </footer>
    </main>
  );
};

export default TripsPage;
