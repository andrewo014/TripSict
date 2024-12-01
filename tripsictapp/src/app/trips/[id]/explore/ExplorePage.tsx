'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './specificTripExplore.module.css';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '../../LogOutButton';

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

// Categories with their respective Google Places API types
const categories = {
  Shopping: ['shopping_mall', 'department_store', 'supermarket', 'book_store'],
  Transportation: ['airport', 'bus_station', 'train_station', 'car_rental'],
  Health: ['spa', 'gym', 'doctor', 'pharmacy'],
  Nightlife: ['bar', 'casino', 'night_club'],
  Outdoors: ['park', 'campground', 'hiking_area', 'beach'],
};

const ExplorePage = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<keyof typeof categories>('Shopping');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Format date function (same as before)
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

  // Fetch trip details from localStorage
  useEffect(() => {
    if (id) {
      const storedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
      const tripDetails = storedTrips.find((t: Trip) => t.id === id);
      setTrip(tripDetails || null);
    }
  }, [id]);

  // Fetch places for the active category
  useEffect(() => {
    const fetchPlaces = async () => {
      if (!trip?.location || !activeTab) {
        console.error('Trip location or active tab is missing.');
        return;
      }
  
      setLoading(true);
      const categoryTypes = categories[activeTab];
      const results: Place[] = [];
  
      for (const type of categoryTypes) {
        const query = `${type}+in+${encodeURIComponent(trip.location)}`;
        console.log(`Fetching: ${query}`);
        try {
          const response = await fetch(`/api/places?query=${query}`);
          const data = await response.json();
          console.log('API Response:', data);
  
          if (data.results) {
            results.push(
              ...data.results.map((place: any) => ({
                name: place.name,
                formatted_address: place.formatted_address,
                rating: place.rating,
                place_id: place.place_id,
                photo_reference: place.photos?.[0]?.photo_reference || null,
              }))
            );
          }
        } catch (error) {
          console.error('Error fetching places:', error);
        }
      }
  
      setPlaces(results);
      setLoading(false);
    };

    
  
    fetchPlaces();
  }, [trip, activeTab]);
  

  const handleTabChange = (tab: keyof typeof categories) => {
    setActiveTab(tab);
  };

  if (!trip) {
    return <p>Loading trip details...</p>;
  }

  return (
    <main className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <div className={styles.titleButton}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={styles.sidebarToggleButton}>
            <img src="/Images/hamburgerMenu.png" alt="Menu" style={{ width: '24px', height: '24px' }} />
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

      <div className={styles.tabContainer}>
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`${styles.tabButton} ${activeTab === category ? styles.activeTab : ''}`}
            onClick={() => handleTabChange(category as keyof typeof categories)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.resultsContainer}>
        {loading ? (
          <p>Loading {activeTab}...</p>
        ) : places.length > 0 ? (
<div className={styles.cardsContainer}>
  {places.map((place, index) => (
    
    <div key={index} className={styles.card}>
      <h3>{place.name || 'No Name Available'}</h3>
      {place.photo_reference ? (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
          alt={place.name}
          className={styles.placeImage}
        />
      ) : (
        <p className={styles.noPhotoText}>Photo not available</p>
      )}
      <p>{place.formatted_address || 'No Address Available'}</p>
      <p>Rating: {place.rating ? `${place.rating}/5 ⭐` : 'No Rating Available'}</p>
    </div>
  ))}
</div>

        ) : (
          <p>No results found for {activeTab}.</p>
        )}
      </div>
    </main>
  );
};

export default ExplorePage;
