"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './SignInPage.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface SignInPageProps {
  onLogin: (user: { username: string; password: string }) => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setter(event.target.value);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      alert('Please enter both username and password!');
      return;
    }

    onLogin({ username, password });

    // Reset form
    setUsername('');
    setPassword('');
  };

  return (

    <main className={styles.pageContent}>

<header className={styles.navbar}>
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
          <Link href="/" passHref>
          <button className={styles.signIn}>Home</button>
          </Link>
          </div>
      </header>
  <div className={styles.nonheadercontent}>
      <h1 className={styles.welcomeTitle}>Welcome Back to TripSict!</h1>
      <h2 className={styles.welcomeTitle}>Sign In</h2>
      <form className={styles.signInForm} onSubmit={submitHandler}>
        <div className={styles.fieldContainer}>
          <label htmlFor="username" className={styles.inputLabel}>Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className={styles.inputField}
            value={username}
            onChange={handleChange(setUsername)}
          />
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="password" className={styles.inputLabel}>Password</label>
          <div className={styles.passwordContainer}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={styles.inputField}
              value={password}
              onChange={handleChange(setPassword)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className={styles.eyeIcon}
              style={{ fontSize: '1.2rem', width: '20px', height: '20px' }}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>Sign In</button>
      </form>
      <br />
      <Link href="/signup" className={styles.loginPrompt}>New User? Register here</Link>
      </div>
    </main>
  );
};

export default SignInPage;
