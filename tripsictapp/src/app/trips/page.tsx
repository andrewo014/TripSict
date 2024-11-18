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


 const addTripHandler = (trip: { name: string; date: string; description: string; location: string }) => {
  if (editTrip) {
    setTrips((prevTrips) => {
      const updatedTrips = prevTrips.map((t) =>
        t.id === editTrip.id ? { ...t, ...trip, id: editTrip.id } : t
      );
      // Sort trips by date after editing
      return updatedTrips.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
    console.log('Edited trip with id:', editTrip.id);
    setEditTrip(null);
  } else {
    const newTrip = { id: Math.random().toString(), ...trip };
    console.log('New trip created:', newTrip);
    setTrips((prevTrips) => {
      const updatedTrips = [...prevTrips, newTrip];
      // Sort trips by date after adding
      return updatedTrips.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  }
  setShowForm(false);
};



 const deleteTripHandler = (id: string) => {
   setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
 };


 const editTripHandler = (id: string) => {
  const tripToEdit = trips.find((trip) => trip.id === id);
  if (tripToEdit) {
    // Use a function to batch state updates safely
    setTimeout(() => {
      setEditTrip(tripToEdit);
      setShowForm(true);
    }, 0);
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
     <header className={styles.navbar}>
      <div className={styles.titleButton}>
       <button onClick={toggleSidebar} className={styles.sidebarToggleButton}>
       <img 
    src="/Images/hamburgerMenu.png" 
    alt="Menu" 
    style={{ width: '24px', height: '24px' }} 
  />
       </button>
       <h1 className={styles.hamburgerTitle}>TripSict</h1>
       </div>
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

     <div className={styles.myDashboard}>
      <h4 className={styles.myDashboardLittleText}>Welcome back, name</h4>
      <h1 className={styles.myDashboardText}>Dashboard</h1>
     </div>

     {/* Sidebar */}
     <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
       <button onClick={toggleSidebar} className={styles.closeButton}>X</button>

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
         <img 
            src="/Images/palmTreeIcon.png" 
            alt="Menu" 
            style={{ width: '24px', height: '24px', marginRight: '8px'  }} 
          />
          Trips
          </button>
          </Link>
          <button className={styles.sidebarButton}>
          <img 
            src="/Images/itineraryIcon.png" 
            alt="Menu" 
            style={{ width: '24px', height: '24px', marginRight: '8px' }} 
          />
          Itinerary
            </button>
         <button className={styles.sidebarButton}>
         <img 
            src="/Images/notepadIcon.png" 
            alt="Menu" 
            style={{ width: '24px', height: '24px', marginRight: '8px'  }} 
          />
          Notes
          </button>
         <button className={styles.sidebarButton}>
         <img 
            src="/Images/planeIcon.png" 
            alt="Menu" 
            style={{ width: '24px', height: '24px', marginRight: '8px'  }} 
          />
          Flights</button>
         <button className={styles.sidebarButton}>Ride Share</button>
       </div>
     </div>

     <div className={styles.addTripForm}>

      
     <h4 className={styles.title}>Trips </h4>
       <button onClick={toggleFormVisibility} className={styles.addTripButton}>
         {showForm ? 'Cancel' : editTrip ? 'Edit Trip' : 'Add Trip'}
       </button>


       

       </div>

    

     <div className={styles.nonHeaderContent}>



       <div className={styles.tripList}>
       {showForm && <TripForm onAddTrip={addTripHandler} editTrip={editTrip} />}
         {trips.length === 0 ? (
           <div className={styles.noTrips}>
             <p>No trips added yet.</p>
           </div>
         ) : (
           <ul>
            {trips.map((trip, index) => (
            <li key={trip.id || index} className={styles.tripItem}>
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
           
      <div className={styles.tripsDisplay}>
        <p>idek bruh</p>
        </div>     
     <footer className={styles.footer}>
         <p>&copy; 2024 TripSict</p>
     </footer>
   </main>
 );
};


export default TripsPage;
