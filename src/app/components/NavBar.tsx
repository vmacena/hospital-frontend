import React from 'react';
import Link from 'next/link';
import styles from '@/app/assets/styles/components/NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import Logo from '@/app/components/Logo';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <Link href="/" passHref legacyBehavior>
                <a className={styles.logo}>
                    <Logo />
                    <h1>MEDICare</h1>
                </a>
            </Link>
            <ul className={styles['nav-links']}>
                <li>
                    <Link href="/pages/patient" legacyBehavior>
                        <a className={styles.link}>Área do Paciente</a>
                    </Link>
                </li>
                <li>
                    <Link href="/pages/doctor" legacyBehavior>
                        <a className={styles.link}>Área do Doutor</a>
                    </Link>
                </li>
            </ul>
            <Link href="/pages/admin" passHref legacyBehavior>
                <a className={styles['pickup-btn']}>
                    <FontAwesomeIcon icon={faUserShield} /> Administrador
                </a>
            </Link>
        </nav>
    );
};

export default Navbar;