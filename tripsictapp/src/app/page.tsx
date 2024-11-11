import Image from "next/image";
import SignInPage from "./Signing/SignInPage";
import SignUpPage from "./Signing/SignUpPage";
import React from 'react';
import Navbar from './components/Navbar';
import Features from './components/Features';
import Content from './components/Content';
import Footer from './components/Footer';

export default function Home() {
  return (
    <SignInPage/>
  );
}
