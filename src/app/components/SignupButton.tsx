"use client"

import { useRouter } from 'next/navigation';
import styles from '@/app/page.module.scss';

export default function SignupButton() {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push('/pages/signup');
  };

  return (
    <button 
        onClick={handleSignupClick} 
        className={styles.button}>Cadastrar
    </button>
  );
}