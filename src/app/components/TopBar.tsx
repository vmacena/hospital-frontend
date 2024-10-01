import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faLinkedin, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import styles from '@/app/assets/styles/components/TopBar.module.scss'; 

const Topbar: React.FC = () => {
  useEffect(() => {
    const topbar = document.querySelector(`.${styles.topbar}`);
    const topbarLeft = document.querySelector(`.${styles['topbar-left']}`);
    const topbarRight = document.querySelector(`.${styles['topbar-right']}`);
    const topbarItems = document.querySelectorAll(`.${styles['topbar-item']}`);
    const socialIcons = document.querySelectorAll(`.${styles['social-icon']}`);

    if (topbar) topbar.classList.add(styles.initial);
    if (topbarLeft) topbarLeft.classList.add(styles.initial);
    if (topbarRight) topbarRight.classList.add(styles.initial);
    topbarItems.forEach(item => item.classList.add(styles.initial));
    socialIcons.forEach(icon => icon.classList.add(styles.initial));

    setTimeout(() => {
      if (topbar) topbar.classList.remove(styles.initial);
      if (topbarLeft) topbarLeft.classList.remove(styles.initial);
      if (topbarRight) topbarRight.classList.remove(styles.initial);
      topbarItems.forEach(item => item.classList.remove(styles.initial));
      socialIcons.forEach(icon => icon.classList.remove(styles.initial));
    }, 100); // Ajuste o tempo conforme necessário
  }, []);

  return (
    <div className={styles.topbar}>
      <div className={styles['topbar-left']}>
        <div className={styles['topbar-item']}>
          <FontAwesomeIcon icon={faClock} /> Seg - Sáb 24h / Domingo 24h
        </div>
        <div className={styles['topbar-item']}>
          <FontAwesomeIcon icon={faPhoneAlt} /> Telefone: 0198-9526503
        </div>
        <div className={styles['topbar-item']}>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Avenida São Carlos, 2978 - São Carlos SP
        </div>
      </div>
      <div className={styles['topbar-right']}>
        <FontAwesomeIcon icon={faInstagram} className={styles['social-icon']} />
        <FontAwesomeIcon icon={faTwitter} className={styles['social-icon']} />
        <FontAwesomeIcon icon={faLinkedin} className={styles['social-icon']} />
        <FontAwesomeIcon icon={faFacebookF} className={styles['social-icon']} />
      </div>
    </div>
  );
};

export default Topbar;