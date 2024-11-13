import { useState, useEffect } from 'react';
import styles from './TripsPage.module.css';

const TripsPage = () => {
  const [trips, setTrips] = useState([]);

  // Fetch trips data when the component mounts
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/trips');  // Replace with actual API endpoint
        const data = await response.json();
        setTrips(data);  // Update the state once the data is fetched
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();  // Call the function to fetch trips data
  }, []);  // Empty array means this runs only on component mount (similar to componentDidMount)

  return (
    <div>
      {/* Render trips only when there is data */}
      {trips.length > 0 ? (
        <ul>
          {trips.map((trip) => (
            // Ensure each item has a unique key
            <li key={trip.id} className={styles.tripItem}>
              <h3 className={styles.tripItemTitle}>{trip.name}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>No trips available.</p> // Optionally, handle the case when there are no trips
      )}
    </div>
  );
};

export default TripsPage;
