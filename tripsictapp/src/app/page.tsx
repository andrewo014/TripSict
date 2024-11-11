import Image from "next/image";
import SignInPage from "./Signing/SignInPage";
<<<<<<< HEAD
import SignUpPage from "./signup/SignUpPage";
=======
import SignUpPage from "./Signing/SignUpPage";
import React from 'react';
import Navbar from './components/Navbar';
import Features from './components/Features';
import Content from './components/Content';
import Footer from './components/Footer';
>>>>>>> 6a666b12470f5f7ca01b5fafaf57b860ce793876

export default function Home() {
  return (
<<<<<<< HEAD
    <SignUpPage/>
=======
    <div>
      <Navbar />
      <Features />
      <Content />
      <SignInPage /> {/* This will render the SignInPage as well */}
      <Footer />
    </div>
>>>>>>> 72f65a6a053feb638d2afea4b3780923f2a26dbd
  );
}
