'use client';
import { useState, useEffect, useRef } from 'react';
import TripForm from './TripForm';
import Image from 'next/image';
import styles from './Trip.module.css';
import Link from 'next/link';
import Dashboard from './dashboard';
import { SessionProvider } from 'next-auth/react';


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
 const [showAlertBox, setShowAlertBox] = useState(false);
 const [hasAlert, setHasAlert] = useState(false);
 const alertBoxRef = useRef<HTMLDivElement | null>(null); 
 const bellIconRef = useRef<HTMLButtonElement | null>(null); 


 const formatDate = (date: Date): string => {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st,"
      : day % 10 === 2 && day !== 12
      ? "nd,"
      : day % 10 === 3 && day !== 13
      ? "rd,"
      : "th,";

  const month = date.toLocaleString('en-US', { month: 'short' }); // Get short month name
  const year = date.getFullYear(); // Get year
  return `${month} ${day}${suffix} ${year}`;
};

const today = new Date();
const formattedDate = formatDate(today);

useEffect(() => {
  const checkAlerts = () => {
    const currentDate = new Date();
    const upcomingAlert = trips.some((trip) => {
      const tripDate = new Date(trip.date);
      const diffTime = tripDate.getTime() - currentDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24); // Convert milliseconds to days
      return diffDays >= 0 && diffDays <= 7; // Check if trip is within a week
    });
    setHasAlert(upcomingAlert);
  };
  checkAlerts();
}, [trips]);

useEffect(() => {
  const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
  console.log('Loaded trips from localStorage:', savedTrips);
  setTrips(savedTrips);
}, []);


 const toggleSidebar = () => {
   setIsSidebarOpen(!isSidebarOpen);
 };

 const toggleAlertBox = () => {
  setShowAlertBox((prev) => {
    if (!prev) {
      setHasAlert(false); // Reset the notification badge when opening the alert box
    }
    return !prev;
  });
};


useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      alertBoxRef.current &&
      !alertBoxRef.current.contains(target) && // Click is outside the alert box
      bellIconRef.current &&
      !bellIconRef.current.contains(target) // Click is also outside the bell icon
    ) {
      setShowAlertBox(false); // Close the alert box
    }
  };

  document.addEventListener('click', handleClickOutside);

  // Cleanup the event listener on component unmount
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);

const addTripHandler = (trip: { name: string; date: string; description: string; location: string }) => {
  if (editTrip) {
    const updatedTrips = trips.map((t) =>
      t.id === editTrip.id ? { ...editTrip, ...trip } : t
    );
    localStorage.setItem('trips', JSON.stringify(updatedTrips)); // Save to localStorage
    console.log('Updated trips array:', updatedTrips);
    setTrips(updatedTrips);
    setEditTrip(null);
  } else {
    const newTrip = { id: Math.random().toString(), ...trip };
    const updatedTrips = [...trips, newTrip];
    localStorage.setItem('trips', JSON.stringify(updatedTrips)); // Save to localStorage
    console.log('New trip created:', newTrip);
    setTrips(updatedTrips);
  }
  setShowForm(false);
};



const deleteTripHandler = (id: string) => {
  const updatedTrips = trips.filter((trip) => trip.id !== id);
  localStorage.setItem('trips', JSON.stringify(updatedTrips)); // Save to localStorage
  console.log('Trips after deletion:', updatedTrips);
  setTrips(updatedTrips);
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
  <SessionProvider>
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

<div className={styles.headerActions}>
  {/* Bell Icon */}
  <div className={styles.bellContainer}>
    <button ref={bellIconRef} className={styles.bellIcon} onClick={toggleAlertBox}>
      <img 
        src="/Images/bellIcon.png" 
        alt="Notification Bell" 
        className={styles.bellImage}
      />
        {hasAlert && (
          <span className={styles.notificationBadge}>
            {trips.filter((trip) => {
              const tripDate = new Date(trip.date);
              const diffTime = tripDate.getTime() - today.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays >= 0 && diffDays <= 7;
            }).length}
          </span>
        )}
      </button>
    </div>

    {/* Alert Box */}
{showAlertBox && (
  <div ref={alertBoxRef} className={styles.alertBox}>
    <h3>Notifications</h3>
    {trips.filter((trip) => {
      const tripDate = new Date(trip.date);
      const diffTime = tripDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7; // Filter trips within the next 7 days
    }).length > 0 ? (
      trips.map((trip) => {
        const tripDate = new Date(trip.date);
        const diffTime = tripDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays <= 7) {
          return (
            <h1 key={trip.id} className={styles.notificationMessage}>
              <strong>{trip.name}</strong> on <strong>{trip.date}</strong> is approaching!
            </h1>
          );
        }
        return null;
      })
    ) : (
      <p>You have no notifications.</p>
    )}
  </div>
)}

    {/* Log Out Button */}
    <Link href="/" passHref>
      <button className={styles.logOutButton}>Log out</button>
    </Link>
  </div>
</header>
    <Dashboard/>
   

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
         <button className={styles.currentPageButton}>
         <img 
            src="/Images/palmTreeIcon.png" 
            alt="Menu" 
            style={{ width: '24px', height: '24px', marginRight: '8px'  }} 
          />
          <h1>Trips</h1>
          </button>
          </Link>
          <button className={styles.sidebarButton}>
          <img 
            src="/Images/itineraryIcon.png" 
            alt="Menu" 
            style={{ width: '24px', height: '24px', marginRight: '8px' }} 
          />
          <h1>Itinerary</h1>
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
          Flights
          </button>
       </div>
     </div>

     <div className={styles.addTripForm}>

      
     <h4 className={styles.title}>Your Trips </h4>
       <button onClick={toggleFormVisibility} className={styles.addTripButton}>
         {showForm ? 'Cancel' : editTrip ? 'Edit Trip' : 'Add Trip +'}
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
        
       <div className={styles.titleAndButtons}>
         <div className={styles.topBanner}>
         <Link href={`/trips/${trip.id}`}>
          <h3 className={styles.locationHighlight}>{trip.name}</h3>
          </Link>
          <p className={styles.locationHighlightLower}>{trip.location}</p>
          </div>
          <p className={styles.middleBanner}>{trip.date}</p>
          <div className={styles.buttonGroup}>
            <button onClick={() => editTripHandler(trip.id)} className={styles.editButton}>Edit</button>
            <button onClick={() => deleteTripHandler(trip.id)} className={styles.deleteButton}>Delete</button>
          </div>
          </div>
          <div className={styles.bottomBanner}>
          <p className={styles.bottomInfo}>{trip.description}</p>
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
   </SessionProvider>
 );
};


export default TripsPage;