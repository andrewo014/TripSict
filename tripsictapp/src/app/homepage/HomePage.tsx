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
          <a href="/signup">Get Started</a>
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

{/*
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
  */}


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

            <div className={styles.headerBottom}>
        
      </div>    


{/*EXPLORE LODGING*/}

      <div className={styles.pageFillerContainer}>

        <div className={styles.imageCards}>

        <div className={styles.headerDescription}>

          <div className={styles.exploration}>EXPLORE LODGING</div>
          <h4 className={styles.descriptionh4}>Discover the perfect place to stay with our curated lodging options. From charming bed-and-breakfasts to luxurious resorts, explore detailed information, including photos, reviews, and amenities, to make your stay unforgettable. Whatever your travel style, find accommodations tailored to your needs and preferences.</h4>


          </div>

      <div className={styles.cardsImageContainer}>
  <Image 
    src="/Images/franceHotel.jpg" 
    alt="France Hotel Photo" 
    width={1000} 
    height={579} 
    className={styles.imagePreview} 
  />
  <div className={styles.overlay}>
    <div className={styles.topBanner}>Paris, France</div>
    <div className={styles.bottomInfo}>
      <div className={styles.details}>
        <span>4.0/5⭐
</span>
      </div>
      <h3>Pullman Paris Tour Eiffel</h3>
      <p>18 Avenue De Suffren, 22 Rue Jean Rey Entrée Au, 75015 Paris, France</p>
    </div>
  </div>
</div>

</div>
</div>


{/*DINING AND RESTAURANTS*/}

<div className={styles.pageFillerContainer}>

<div className={styles.imageCards}>

<div className={styles.imageContainer}>
<Image 
src="/Images/mexicanRestaurant.jpg" 
alt="Another Beach Background" 
width={1000} 
height={579} 
className={styles.tripPreview} 
/>
<div className={styles.overlay}>
<div className={styles.topBanner}>Zona Hotelera, Cancun</div>
<div className={styles.bottomInfo}>
<div className={styles.details}>
<span>5/5⭐</span>
</div>
<h3>NAVÍOS Mexican Fusion Seafood</h3>
<p>Blvd. Kukulcan Km. 19.5, Zona Hotelera, 77500 Cancún, Q.R., Mexico</p>
</div>
</div>
</div>

<div className={styles.headerDescription}>
<div className={styles.exploration}>DINING</div>
<h4 className={styles.descriptionh4}>Treat your taste buds to an array of dining options, from local eateries to fine dining restaurants. Explore detailed descriptions, reviews, and photos to find the perfect spot for every meal. Whether you're in the mood for comfort food or culinary adventures, we've got the recommendations to satisfy your cravings.</h4>
</div>


</div>

        
      </div>

{/*ATTRACTIONS*/}

      <div className={styles.pageFillerContainer}>

<div className={styles.imageCards}>

<div className={styles.headerDescription}>

<div className={styles.exploration}>ATTRACTIONS</div>
<h4 className={styles.descriptionh4}>Discover the best attractions to make your trip unforgettable. From must-see landmarks to hidden gems, explore detailed information, reviews, and photos to plan your perfect adventure. Whatever your interests, find experiences that make every moment memorable.</h4>

</div>


<div className={styles.imageContainer}>
<Image 
src="/Images/archesUtah.webp" 
alt="Arches National Park Utah" 
width={1000} 
height={579} 
className={styles.tripPreview} 
/>
<div className={styles.overlay}>
<div className={styles.topBanner}>Grand County, Utah</div>
<div className={styles.bottomInfo}>
<div className={styles.details}>
<span>4.8/5⭐</span>
</div>
<h3>Arches National Park</h3>

</div>
</div>
</div>


</div>

        
      </div>

{/*DINING AND RESTAURANTS*/}

<div className={styles.pageFillerContainer}>

<div className={styles.imageCards}>

<div className={styles.imageContainer}>
<Image 
src="/Images/ferrisWheel.jpg" 
alt="Ferris Wheel Photo" 
width={1000} 
height={579} 
className={styles.tripPreview} 
/>
<div className={styles.overlay}>
<div className={styles.topBanner}>TRIPSICT</div>
<div className={styles.bottomInfo}>
<div className={styles.details}>
</div>
<h3>Your Guide to Seamless Getaways and Unforgettable Adventures!</h3>
</div>
</div>
</div>

<div className={styles.headerDescription}>
<div className={styles.exploration}>AND SO MUCH MORE!</div>
<h4 className={styles.descriptionh4}>TripSict is your ultimate travel companion, designed to take the stress out of planning and help you craft the perfect getaway. From organizing your itinerary to discovering unique experiences, Tripsict ensures every trip is as smooth as it is memorable. Let us guide you to your next adventure with ease and style!</h4>
<Link href="/signup" passHref>
            <button className={styles.registerBtn}>Get Started</button>
        </Link>
</div>


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
