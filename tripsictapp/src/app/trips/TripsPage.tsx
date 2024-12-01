"use client";

import { useState, useEffect, useRef } from "react";
import TripForm from "./TripForm";
import Image from "next/image";
import styles from "./Trip.module.css";
import Link from "next/link";
import Dashboard from "./dashboard";
import { SessionProvider, useSession } from "next-auth/react";
import LogoutButton from "./LogOutButton"; 

interface Trip {
  id: string;
  name: string;
  date: string;
  description: string;
  location: string;
}

const TripsPage: React.FC = () => {
  const { data: session } = useSession();
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
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${day}${suffix} ${year}`;
  };

  const today = new Date();
  const formattedDate = formatDate(today);

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips") || "[]");
    setTrips(savedTrips);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAlertBox = () => {
    setShowAlertBox((prev) => {
      if (!prev) {
        setHasAlert(false);
      }
      return !prev;
    });
  };

  const addTripHandler = (trip: {
    name: string;
    date: string;
    description: string;
    location: string;
  }) => {
    if (editTrip) {
      const updatedTrips = trips.map((t) =>
        t.id === editTrip.id ? { ...editTrip, ...trip } : t
      );
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      setTrips(updatedTrips);
      setEditTrip(null);
    } else {
      const newTrip = { id: Math.random().toString(), ...trip };
      const updatedTrips = [...trips, newTrip];
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      setTrips(updatedTrips);
    }
    setShowForm(false);
  };

  const deleteTripHandler = (id: string) => {
    const updatedTrips = trips.filter((trip) => trip.id !== id);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
  };

  const editTripHandler = (id: string) => {
    const tripToEdit = trips.find((trip) => trip.id === id);
    if (tripToEdit) {
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
            <button
              onClick={toggleSidebar}
              className={styles.sidebarToggleButton}
            >
              <Image
                src="/Images/hamburgerMenu.png"
                alt="Menu"
                width={24}
                height={24}
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
            <div className={styles.bellContainer}>
              <button
                ref={bellIconRef}
                className={styles.bellIcon}
                onClick={toggleAlertBox}
              >
                <Image
                  src="/Images/bellIcon.png"
                  alt="Notification Bell"
                  width={24}
                  height={24}
                  className={styles.bellImage}
                />
                {hasAlert && (
                  <span className={styles.notificationBadge}>
                    {trips.filter((trip) => {
                      const tripDate = new Date(trip.date);
                      const diffTime = tripDate.getTime() - today.getTime();
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      );
                      return diffDays >= 0 && diffDays <= 7;
                    }).length}
                  </span>
                )}
              </button>
            </div>
            <LogoutButton />
          </div>
        </header>

        <Dashboard />

        <div
          className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
        >
          <button onClick={toggleSidebar} className={styles.closeButton}>
            X
          </button>

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
                <Image
                  src="/Images/palmTreeIcon.png"
                  alt="Trips"
                  width={24}
                  height={24}
                  style={{ marginRight: "8px" }}
                />
                <h1>Trips</h1>
              </button>
            </Link>
            <Link href="flights" passHref>
              <button className={styles.currentPageButton}>
                <Image
                  src="/Images/planeIcon.png"
                  alt="Flights"
                  width={24}
                  height={24}
                  style={{ marginRight: "8px" }}
                />
                <h1>Flights</h1>
              </button>
            </Link>
          </div>
        </div>

        <div className={styles.addTripForm}>
          <h4 className={styles.title}>Your Trips</h4>
          {session ? (
            <button
              onClick={toggleFormVisibility}
              className={styles.addTripButton}
            >
              {showForm ? "Cancel" : editTrip ? "Edit Trip" : "Add Trip +"}
            </button>
          ) : (
            <p className={styles.signInPrompt}>
              Please sign in to add, edit, or delete trips.
            </p>
          )}
        </div>

        <div className={styles.nonHeaderContent}>
          <div className={styles.tripList}>
            {showForm && (
              <TripForm onAddTrip={addTripHandler} editTrip={editTrip} />
            )}
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
                          <h3 className={styles.locationHighlight}>
                            {trip.name}
                          </h3>
                        </Link>
                        <p className={styles.locationHighlightLower}>
                          {trip.location}
                        </p>
                      </div>
                      <p className={styles.middleBanner}>{trip.date}</p>
                      {session && (
                        <div className={styles.buttonGroup}>
                          <button
                            onClick={() => editTripHandler(trip.id)}
                            className={styles.editButton}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTripHandler(trip.id)}
                            className={styles.deleteButton}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    <div className={styles.tripDescription}>
                      <p>{trip.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </SessionProvider>
  );
};

export default TripsPage;
