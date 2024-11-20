'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './specificTrip.module.css';
import Image from 'next/image';
import Link from 'next/link';

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

const TripDetailsPage = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  // Load trip details from localStorage
  useEffect(() => {
    if (id) {
      const storedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
      const tripDetails = storedTrips.find((t: Trip) => t.id === id);
      setTrip(tripDetails || null);
    }
  }, [id]);

  // Load selected places from localStorage on mount
  useEffect(() => {
    const savedLodging = localStorage.getItem('selectedPlaces');
    if (savedLodging) {
      setSelectedPlaces(JSON.parse(savedLodging));
    }
  }, []);

  // Save selected places to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedPlaces', JSON.stringify(selectedPlaces));
  }, [selectedPlaces]);

  // Fetch places and filter out those already in selectedPlaces
  useEffect(() => {
    const fetchPlaces = async () => {
      if (!trip?.location) {
        console.error('Trip location is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/places?query=lodging+in+${encodeURIComponent(trip.location)}`
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

        // Filter fetched places to exclude already selected places
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

  const handleAddToYourLodging = (place: Place) => {
    setSelectedPlaces((prev) => [...prev, place]);
    setPlaces((prev) => prev.filter((p) => p.place_id !== place.place_id));
  };

  const handleRemoveFromYourLodging = (place: Place) => {
    setSelectedPlaces((prev) => prev.filter((p) => p.place_id !== place.place_id));
    setPlaces((prev) => [...prev, place]);
  };

  if (!trip) {
    return <p>Loading trip details...</p>;
  }

  return (
    <main className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.Title}>TripSict</h1>
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
          <Link href="/" passHref>
            <button className={styles.headerButtonStyle}>Log out</button>
          </Link>
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

      <div className={styles.lodging}>
        <h1 className={styles.lodgingTitle}>Your Lodging</h1>
        <div className={styles.cardsContainer}>
          {selectedPlaces.length > 0 ? (
            selectedPlaces.map((place, index) => (
                <div key={index} className={styles.lodgingCard}>
                <h3 className={styles.cardTitle}>
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
                <p className={styles.cardRating}>
                  Rating: {place.rating ? `${place.rating}/5 ⭐` : 'N/A'}
                </p>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFromYourLodging(place)}
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <h1 className={styles.noLodging}>No lodging selected yet.</h1>
          )}
        </div>
      </div>

      <div className={styles.lodging}>
        <h1 className={styles.lodgingTitle}>
          Lodging options in: {trip.location}
        </h1>
        <div className={styles.cardsContainer}>
          {loading ? (
            <p>Loading lodging options...</p>
          ) : places.length > 0 ? (
            places.map((place, index) => (
              <div key={index} className={styles.lodgingCard}>
                <h3 className={styles.cardTitle}>
                <a
            href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.placeLink}
            >
            {place.name}
            </a>

            {place.photo_reference ? (
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
              alt={place.name}
              className={styles.placeImage}
            />
          ) : (
            <p className={styles.noPhotoText}>Photo not available</p>
          )}

                </h3>
                <p className={styles.cardAddress}>{place.formatted_address}</p>
                <p className={styles.cardRating}>
                  Rating: {place.rating ? `${place.rating}/5 ⭐` : 'N/A'}
                </p>
                <button
                  className={styles.addButton}
                  onClick={() => handleAddToYourLodging(place)}
                >
                  Add
                </button>
              </div>
            ))
          ) : (
            <p>No lodging options found for {trip.location}.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default TripDetailsPage;
