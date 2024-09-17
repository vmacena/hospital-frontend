"use client"

import styles from '../page.module.scss';

interface LoginFormProps {
  formType: string;
  placeholder: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
}

export default function LoginForm({ formType, placeholder, onSubmit, isLoading, inputValue, setInputValue }: LoginFormProps) {
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
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Carregando...' : 'Entrar'}
      </button>
    </form>
  );
}