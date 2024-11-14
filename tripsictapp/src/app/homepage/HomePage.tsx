"use client";
import React from 'react';
import Image from 'next/image';
import styles from './homepage.module.css';
import Link from 'next/link';




export default function Homepage() {


  const items = [
    { id: 1, image: '/Images/sunnyBeach.jpg', title: 'Beach Getaway', description: "Escape to the coast for a sun-filled adventure where crystal-clear waters meet soft sandy shores." },
    { id: 2, image: '/Images/nyc.jpg', title: 'City Adventure', description: 'Dive into the vibrant city life, filled with iconic sights, diverse cuisine, and thrilling nightlife.' },
    { id: 3, image: '/Images/mountainRetreat.jpg', title: 'Mountain Retreat', description: 'Relax in the peaceful mountains, where stunning views and fresh air create the ultimate getaway' },
    { id: 4, image: '/Images/family.webp', title: 'And More!', description: "Discover a world of unique experiences, from countryside escapes to adventure sports and cultural festivals."}
  ];


  return (


   


    <div className={styles.pageContainer}>
    <div className={styles.container}>
      <header className={styles.headerTop}>
        <div className={styles.options}>
        <div className={styles.pageTitle}>TripSict</div>
        <nav className={styles.nav}>
          <a href="#">Get Inspired</a>
          <a href="#">How it Works</a>
          <Image 
          src="/Images/triptactLogo.jpg"
          alt="Triptact Photo Log"
          width={80}
          height={80}
          className={styles.logoImage}
        />
          <a href="#">Travel Planning Tips</a>
          <a href="#">Get Started</a>
        </nav>
          <Link href="trips" passHref>
          <button className={styles.signIn}>Sign In</button>
          </Link>
          </div>
          <main className={styles.content}>
        <div className={styles.newUser}>
        <div className={styles.intro}>The Perfect Place To Plan <br />
          Your Next Trip Away!</div>
          <h1>Use TripSict app to plan your <br /> next getaway!</h1>
          <p>With up-to-date information on lodging, <br /> food, and points of interest, <br /> travel planning has never been easier!</p>
          <Link href="/signup" passHref>
            <button className={styles.registerBtn}>New User? Register Here</button>
        </Link>
        <Link href="signin" passHref>
          <button className={styles.signIn2}>Sign In</button>
          </Link>
        </div>
    
        <div className={styles.imageContainer}>
  <Image 
    src="/Images/anotherBeach.jpg" 
    alt="Another Beach Background" 
    width={1000} 
    height={579} 
    className={styles.tripPreview} 
  />
  <div className={styles.overlay}>
    <div className={styles.topBanner}>Oahu, Hawaii</div>
    <div className={styles.bottomInfo}>
      <div className={styles.details}>
        <span>Snorkeling</span> · <span>Surfing</span> · <span>Hiking</span>
      </div>
      <h3>Adventure Awaits in Oahu</h3>
      <p>Plan Your Trip Now!</p>
    </div>
  </div>
</div>



      </main>

      </header>

      

      <div className={styles.headerBottom}>
        
      </div>


      <div className={styles.itemList}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <Image src={item.image} alt={item.title} width={200} height={200} className={styles.itemImage} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>


          <div className={styles.headerTop}>
       
      </div>    
   


      <div className={styles.features}>
        <div className={styles.feature}>
          <Image src="/Images/heart.png" alt="Heart" width={100} height={100} className={styles.icon} />
          <p>Save Lodging, Restaurants <br /> and Attractions</p>
        </div>
        <div className={styles.feature}>
          <Image src="/Images/plane.png" alt="Plane" width={100} height={100} className={styles.icon} />
          <p>Save your flight <br /> information</p>
        </div>
        <div className={styles.feature}>
          <Image src="/Images/notebook.png" alt="Notebook" width={100} height={100} className={styles.icon} />
          <p>Create and save custom <br /> note entries</p>
        </div>
        <div className={styles.feature}>
          <Image src="/Images/star.png" alt="Star" width={100} height={100} className={styles.icon} />
          <p>View star ratings for <br /> all locations</p>
        </div>
      </div>

      <footer className={styles.bottom}>
        <div className={styles.footerContent}>
        <button className={styles.footerButtons}>About Tripsict</button>
        <button className={styles.footerButtons}>Founders</button>
        <Image src="/Images/triptactLogo.jpg" alt="Triptact Photo Log" width={80} height={80} className={styles.logoImage} />
        <button className={styles.footerButtons}>Help Center</button>
        <button className={styles.footerButtons}>Report an issue</button>
        </div>
      </footer>
    </div>
    </div>
  );
}
