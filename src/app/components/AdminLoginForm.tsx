"use client"

import { useState } from 'react';
import styles from '../page.module.scss';
import Loading from 'react-loading';
import { useAdminAuth } from '../hooks/admin/login/useAdminAuth';

export default function AdminLoginForm() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { adminCredential, setAdminCredential, handleAdminSubmit } = useAdminAuth();

    const handleAdminFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoggingIn(true);

        const MIN_LOADING_TIME = 3000; // 3 segundos
        const startTime = Date.now();

        handleAdminSubmit(e, null, null).finally(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = MIN_LOADING_TIME - elapsedTime;

            if (remainingTime > 0) {
                setTimeout(() => {
                    setIsLoggingIn(false);
                }, remainingTime);
            } else {
                setIsLoggingIn(false);
            }
        });
    };

    return (
        <form onSubmit={handleAdminFormSubmit}>
            <input
                type="text"
                required
                name="credential"
                placeholder="Insira sua credencial"
                className={styles.input}
                value={adminCredential}
                onChange={(e) => setAdminCredential(e.target.value)}
            />
            <button type="submit" className={styles.button} disabled={isLoggingIn}>
                {isLoggingIn ? <Loading type="spin" color="#fff" height={20} width={20} /> : 'Entrar'}
            </button>
        </form>
    );
}