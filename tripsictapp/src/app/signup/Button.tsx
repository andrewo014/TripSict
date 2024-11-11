import React from 'react';
import styles from './SignUpPage.module.css';

interface ButtonProps {
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className={styles.submitButton}>
      {text}
    </button>
  );
};