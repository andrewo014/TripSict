'use client'; // Add this directive at the top of your file
import { useState, ChangeEvent, FormEvent } from 'react';

interface TripFormProps {
  onAddTrip: (trip: { name: string, date: string, description: string, location: string }) => void;
}

const TripForm: React.FC<TripFormProps> = ({ onAddTrip }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!name || !date || !description || !location) {
      alert('Please fill in all fields');
      return;
    }

    const newTrip = {
      name,
      date,
      description,
      location,
    };

    onAddTrip(newTrip);

    // Reset the form fields
    setName('');
    setDate('');
    setDescription('');
    setLocation('');
  };

  return (
    <form onSubmit={submitHandler}>
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

      <button type="submit">Add Trip</button>
    </form>
  );
};

export default TripForm;
