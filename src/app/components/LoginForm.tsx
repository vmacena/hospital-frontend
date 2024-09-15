"use client"

import { useState } from 'react';
import styles from '../page.module.scss';

interface LoginFormProps {
  formType: string;
  placeholder: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm({ formType, placeholder, onSubmit }: LoginFormProps) {
  const [inputValue, setInputValue] = useState('');

  return (
    <form onSubmit={onSubmit}>
      <input 
        type="text"
        required
        name={formType}
        placeholder={placeholder}
        className={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className={styles.button}>Entrar</button>
    </form>
  );
}