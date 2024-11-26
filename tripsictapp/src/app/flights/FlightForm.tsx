'use client';
import { useState, useEffect } from 'react';
import styles from './FlightForm.module.css';

interface FlightFormProps {
  onAddFlight: (flight: Flight) => void;
  editFlight: Flight | null;
}

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  gate: string;
  departureTime: string;
  arrivalTime: string;
  description?: string;
}

const FlightForm: React.FC<FlightFormProps> = ({ onAddFlight, editFlight }) => {
  const [flight, setFlight] = useState<Flight>({
    id: '',
    airline: '',
    flightNumber: '',
    gate: '',
    departureTime: '',
    arrivalTime: '',
    description: '',
  });

  useEffect(() => {
    if (editFlight) {
      setFlight(editFlight);
    }
  }, [editFlight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFlight((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFlight(flight);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.flightForm}>
        <input
        type="text"
        name="airline"
        value={flight.airline}
        onChange={handleChange}
        placeholder="Airline"
        />
      <input
        type="text"
        name="flightNumber"
        value={flight.flightNumber}
        onChange={handleChange}
        placeholder="Flight Number"
      />
      <input
        type="text"
        name="gate"
        value={flight.gate}
        onChange={handleChange}
        placeholder="Gate"
      />
      <input
        type="time"
        name="departureTime"
        value={flight.departureTime}
        onChange={handleChange}
        placeholder="Departure Time"
      />
      <input
        type="time"
        name="arrivalTime"
        value={flight.arrivalTime}
        onChange={handleChange}
        placeholder="Arrival Time"
      />
      <textarea
        name="description"
        value={flight.description}
        onChange={handleChange}
        placeholder="Additional Details (optional)"
      />
      <button type="submit">Save Flight</button>
    </form>
  );
};

export default FlightForm;
