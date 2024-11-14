"use client";
import React from 'react';
import Image from 'next/image';
import styles from './homepage.module.css';
import Link from 'next/link';




export default function Homepage() {


  const items = [
    { id: 1, image: '/Images/sunnyBeach.jpg', title: 'Sunny Beach', description: 'Enjoy a day at the sunny beach with clear waters.' },
    { id: 2, image: '/Images/nyc.jpg', title: 'City Adventure', description: 'Discover the vibrant life of the city.' },
    { id: 3, image: '/Images/mountainRetreat.jpg', title: 'Mountain Retreat', description: 'Relax in the mountains with beautiful scenery.' }
  ];


  return (


   


    <div className={styles.pageContainer}>
    <div className={styles.container}>
      <header className={styles.idek}>
        <div className={styles.navbar}>
        <div className={styles.logo}>TripSict</div>
        <nav className={styles.nav}>
          <a href="#">Overview</a>
          <a href="#">Pages</a>
          <Image 
          src="/Images/triptactLogo.jpg"
          alt="Triptact Photo Log"
          width={80}
          height={80}
          className={styles.logoImage}
        />
          <a href="#">Information</a>
          <a href="#">Cart (2)</a>
        </nav>
          <Link href="trips" passHref>
          <button className={styles.signIn}>Sign In</button>
          </Link>
          </div>

          <main className={styles.content}>
        <div className={styles.newUser}>
          <h1>Use our app to plan your <br /> next getaway!</h1>
          <p>With up-to-date information on lodging, <br /> food, and points of interest, <br /> travel planning has never been easier!</p>
          <Link href="/signup" passHref>
            <button className={styles.registerBtn}>New User? Register Here</button>
        </Link>
        <Link href="signin" passHref>
          <button className={styles.signIn2}>Sign In</button>
          </Link>
        </div>
        <div className={styles.appContainer}>
          <div className={styles.topBar}>
            <div className={styles.windowControls}>
              <span className={`${styles.circle} ${styles.red}`}></span>
              <span className={`${styles.circle} ${styles.yellow}`}></span>
              <span className={`${styles.circle} ${styles.green}`}></span>
            </div>
            <div className={styles.navControls}>
              <span className={styles.arrow}>&larr;</span>
              <span className={styles.arrow}>&rarr;</span>
            </div>
          </div>
          <Image src="/Images/family.webp" alt="Paris Trip Preview" width={1000} height={579} className={styles.tripPreview} />
        </div>
      </main>

      </header>

      

      <div className={styles.headerBottom}>
        <div className={styles.intro}>The perfect place to plan your next trip away!</div>
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


      <main className={styles.content}>
        <div className={styles.newUser}>
          <h1>Use our app to plan your <br /> next getaway!</h1>
          <p>With up-to-date information on lodging, <br /> food, and points of interest, <br /> travel planning has never been easier!</p>
          <Link href="/signup" passHref>
            <button className={styles.registerBtn}>New User? Register Here</button>
        </Link>
        <Link href="signin" passHref>
          <button className={styles.signIn2}>Sign In</button>
          </Link>
        </div>
        <div className={styles.appContainer}>
          <div className={styles.topBar}>
            <div className={styles.windowControls}>
              <span className={`${styles.circle} ${styles.red}`}></span>
              <span className={`${styles.circle} ${styles.yellow}`}></span>
              <span className={`${styles.circle} ${styles.green}`}></span>
            </div>
            <div className={styles.navControls}>
              <span className={styles.arrow}>&larr;</span>
              <span className={styles.arrow}>&rarr;</span>
            </div>
          </div>
          <Image src="/Images/family.webp" alt="Paris Trip Preview" width={1000} height={579} className={styles.tripPreview} />
        </div>
      </main>


      <footer className={styles.bottom}>
        <div className={styles.footerContent}>
        <Image src="/Images/triptactLogo.jpg" alt="Triptact Photo Log" width={80} height={80} className={styles.logoImage} />
        <button className={styles.footerButtons}>About Tripsict</button>
        <button className={styles.footerButtons}>Founders</button>
        <button className={styles.footerButtons}>Help Center</button>
        <button className={styles.footerButtons}>Report an issue</button>
        </div>
      </footer>
    </div>
    </div>
  );
}
