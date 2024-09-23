import React from 'react';
import styles from '@/app/assets/styles/components/Logo.module.scss';

const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <img src="/logo.png" alt="Logo" />
    </div>
  );
};

export default Logo;