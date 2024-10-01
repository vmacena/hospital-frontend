import React from 'react';
import Link from 'next/link';
import styles from '@/app/assets/styles/components/NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import Logo from '@/app/components/Logo';


const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Logo />
                <h1>MEDICare</h1>
            </div>
            <ul className={styles['nav-links']}>
                <li>
                    <Link href="/pages/patient">
                        Área do Paciente
                    </Link>
                </li>
                <li>
                    <Link href="/pages/doctor">
                        Área do Doutor
                    </Link>
                </li>
            </ul>
            <Link href="/pages/admin" className={styles['pickup-btn']}>
                <FontAwesomeIcon icon={faUserShield} /> Administrador
            </Link>
        </nav>
    );
};

export default Navbar;