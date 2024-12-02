
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './specificTripDining.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LogoutButton from '../../LogOutButton';
import { useSession } from 'next-auth/react';

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
  place_id: string;
  photo_reference?: string;
}

const DiningPage = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'yourDining' | 'diningOptions'>('yourDining');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();


 

const DiningPage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log('Dynamic Route ID:', id);

  return <h1>Dining Page for Trip ID: {id}</h1>;
};


  console.log('Trip ID:', id);

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
    if (id) {
      const storedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
      const tripDetails = storedTrips.find((t: Trip) => t.id === id);
      setTrip(tripDetails || null);
    }
  }, [id]);

  useEffect(() => {
    const savedDining = localStorage.getItem('selectedDiningPlaces');
    if (savedDining) {
      setSelectedPlaces(JSON.parse(savedDining));
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    localStorage.setItem('selectedDiningPlaces', JSON.stringify(selectedPlaces));
  }, [selectedPlaces]);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!trip?.location) {
        console.error('Trip location is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/places?query=dining+in+${encodeURIComponent(trip.location)}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch places: ${response.statusText}`);
        }

        const data = await response.json();

        const placesWithPhotos: Place[] = data.map((place: any) => ({
          name: place.name,
          formatted_address: place.formatted_address,
          rating: place.rating,
          place_id: place.place_id,
          photo_reference: place.photos?.[0]?.photo_reference || null,
        }));

        setPlaces(
          placesWithPhotos.filter(
            (place) =>
              !selectedPlaces.some(
                (selectedPlace) => selectedPlace.place_id === place.place_id
              )
          )
        );
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setLoading(false);
      }
    };

    if (trip) {
      fetchPlaces();
    }
  }, [trip, selectedPlaces]);

  const handleAddToYourDining = (place: Place) => {
    setSelectedPlaces((prev) => [...prev, place]);
    setPlaces((prev) => prev.filter((p) => p.place_id !== place.place_id));
  };

  const handleRemoveFromYourDining = (place: Place) => {
    setSelectedPlaces((prev) => prev.filter((p) => p.place_id !== place.place_id));
    setPlaces((prev) => [...prev, place]);
  };

  const handleTabChange = (tab: 'yourDining' | 'diningOptions') => {
    setActiveTab(tab);
  };

  if (!trip) {
    return <p>Loading trip details...</p>;
  }

  return (
    <main className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <div className={styles.titleButton}>
          <button onClick={toggleSidebar} className={styles.sidebarToggleButton}>
            <img 
              src="/Images/hamburgerMenu.png" 
              alt="Menu" 
              style={{ width: '24px', height: '24px' }} 
            />
          </button>
          <h1 className={styles.Title}>TripSict</h1>
        </div>
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
          <LogoutButton />
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
       <Link href={`/trips/${id}`} passHref>
         <button className={styles.sidebarButton}>
         <img 
            src="/Images/anotherHotel.png" 
            alt="Menu" 
            style={{ width: '24px', height: '24px', marginRight: '8px'  }} 
          />
          <h1>Lodging</h1>
          </button>
          </Link>
          <Link href={`/trips/${id}/dining`} passHref>
          <button className={styles.currentPageButton}>
          <img 
            src="/Images/fork.png" 
            alt="Menu" 
            style={{ width: '24px', height: '24px', marginRight: '8px' }} 
          />
          <h1>Dining</h1>
            </button>
            </Link>
            <Link href={`/trips/${id}/attractions`}>
         <button className={styles.sidebarButton}>
         <img 
            src="/Images/laugh.png" 
            alt="Menu" 
            style={{ width: '24px', height: '24px', marginRight: '8px'  }} 
          />
          Attractions
          </button>
          </Link>
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


      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'yourDining' ? styles.activeTab : ''
          }`}
          onClick={() => handleTabChange('yourDining')}
        >
          Your Dining
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'diningOptions' ? styles.activeTab : ''
          }`}
          onClick={() => handleTabChange('diningOptions')}
        >
          Dining Options
        </button>
      </div>

      {activeTab === 'yourDining' && (
        <div className={styles.lodging}>
          <h1>Your Dining</h1>
          <div className={styles.cardsContainer}>
            {selectedPlaces.length > 0 ? (
              selectedPlaces.map((place, index) => (
                <div key={index} className={styles.lodgingCard}>
                  <h3>
                  <a
                      href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.placeLink}
                    >
                      {place.name}
                    </a>
                  </h3>
                  {place.photo_reference ? (
                    <img
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                      alt={place.name}
                      className={styles.placeImage}
                    />
                  ) : (
                    <p className={styles.noPhotoText}>Photo not available</p>
                  )}
                  <p className={styles.cardAddress}>{place.formatted_address}</p>
                  <p className={styles.cardRating}>Rating: {place.rating ? `${place.rating}/5 ⭐` : 'N/A'}</p>
                  <button className={styles.addButton} onClick={() => handleRemoveFromYourDining(place)} disabled={!session}>Remove
                  </button>
                </div>
              ))
            ) : (
              <h1 className={styles.noLodging}>No dining places selected yet.</h1>
            )}
          </div>
        </div>
      )}

      {activeTab === 'diningOptions' && (
        <div className={styles.lodging}>
          <h1>Dining Options in: {trip.location}</h1>
          <div className={styles.cardsContainer}>
            {loading ? (
              <p>Loading...</p>
            ) : places.length > 0 ? (
              places.map((place, index) => (
                <div key={index} className={styles.lodgingCard}>
                  <h3 className={styles.cardTitle}>
                    {place.name}</h3>
                    {place.photo_reference ? (
                    <img
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                      alt={place.name}
                      className={styles.placeImage}
                    />
                  ) : (
                    <p className={styles.noPhotoText}>Photo not available</p>
                  )}
                  <p className={styles.cardAddress}>{place.formatted_address}</p>
                  <p className={styles.cardRating}>Rating: {place.rating ? `${place.rating}/5 ⭐` : 'N/A'}</p>
                  <button className={styles.addButton} onClick={() => handleAddToYourDining(place)} disabled={!session}>Add </button>
                </div>
              ))
            ) : (
              <p>No dining options found.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default DiningPage;

