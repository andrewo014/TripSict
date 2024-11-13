// tripForm.tsx
'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './Trip.module.css';

interface TripFormProps {
  onAddTrip: (trip: { id?: string; name: string; date: string; description: string; location: string }) => void;
  editTrip?: { id: string; name: string; date: string; description: string; location: string } | null;
}

const TripForm: React.FC<TripFormProps> = ({ onAddTrip, editTrip }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (editTrip) {
      setName(editTrip.name);
      setDate(editTrip.date);
      setDescription(editTrip.description);
      setLocation(editTrip.location);
    } else {
      setName('');
      setDate('');
      setDescription('');
      setLocation('');
    }
  }, [editTrip]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!name || !date || !description || !location) {
      alert('Please fill in all fields');
      return;
    }

    const newTrip = {
      id: editTrip?.id,
      name,
      date,
      description,
      location,
    };

    onAddTrip(newTrip);

    setName('');
    setDate('');
    setDescription('');
    setLocation('');
  };

  return (
    <form onSubmit={submitHandler} className={styles.tripForm}>
      <label htmlFor="name">Trip Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        required
      />

      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="location">Location</label>
      <input
        id="location"
        type="text"
        value={location}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
        required
      />

      <button type="submit">{editTrip ? 'Save Changes' : 'Add Trip'}</button>
    </form>
  );
};

export default TripForm;
