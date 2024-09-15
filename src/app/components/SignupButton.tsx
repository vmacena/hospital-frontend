"use client"

import { useRouter } from 'next/navigation';
import styles from '../page.module.scss';

export default function SignupButton() {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push('/pages/signup');
  };

  return (
    <button onClick={handleSignupClick} className={styles.signupButton}>Cadastrar</button>
  );
}