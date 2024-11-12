"use client"; // Ensure that this is at the top

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './SignUpPage.module.css';
import Link from 'next/link';

interface SignUpPageProps {
  onAddUser: (user: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onAddUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setter(event.target.value);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!username || !password || !email || !firstName || !lastName) {
      alert('Please enter all required fields!');
      return;
    }

    const newUser = {
      id: Math.floor(Math.random() * 1000),
      firstName,
      lastName,
      username,
      email,
      password,
    };

    onAddUser(newUser);

    // Reset form
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <main className={styles.pageContent}>
      <div className={styles.homeContainer}>
        <Link href="/homepage" className={styles.homeLink}>Home</Link>
      </div>
      <h1 className={styles.welcomeTitle}>Welcome to TripTact!</h1>
      <h2 className={styles.welcomeTitle}>Sign Up</h2>
      <form className={styles.signUpForm} onSubmit={submitHandler}>
        <div className={styles.name}>
          <div className={styles.fieldContainer}>
            <label htmlFor="firstName" className={styles.inputLabel}>First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              className={styles.inputField}
              value={firstName}
              onChange={handleChange(setFirstName)}
            />
          </div>

          <div className={styles.fieldContainer}>
            <label htmlFor="lastName" className={styles.inputLabel}>Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              className={styles.inputField}
              value={lastName}
              onChange={handleChange(setLastName)}
            />
          </div>
        </div>

        <label htmlFor="username" className={styles.inputLabel}>Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          className={styles.inputField}
          value={username}
          onChange={handleChange(setUsername)}
        />

        <label htmlFor="email" className={styles.inputLabel}>Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className={styles.inputField}
          value={email}
          onChange={handleChange(setEmail)}
        />

        <label htmlFor="password" className={styles.inputLabel}>Password</label>
        <div className={styles.passwordFieldContainer}>
          <input
            id="password"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Enter your password"
            className={styles.inputField}
            value={password}
            onChange={handleChange(setPassword)}
          />
          <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            className={styles.eyeIcon}
            style={{ fontSize: '1.2rem', width: '20px', height: '20px' }}
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>

        <button type="submit" className={styles.submitButton}>Create Account</button>
      </form>
      <br/>
      <Link href="/signin" className={styles.loginPrompt}>Already Have an Account?</Link>
    </main>
  );
};

export default SignUpPage;
