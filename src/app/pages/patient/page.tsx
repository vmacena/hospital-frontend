"use client";

import React, { useState } from 'react';
import styles from '@/app/page.module.scss';
import { usePatientAuth } from '@/app/hooks/patient/usePatientAuth';
import LoginForm from '@/app/components/LoginForm';
import SignupButton from '@/app/components/SignupButton';
import Navbar from '@/app/components/NavBar';

const PatientPage: React.FC = () => {
    const { susNumber, setSusNumber, handlePatientSubmit } = usePatientAuth();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Navbar />
            <div className={styles.containerCenter}>
                <section className={styles.panel}>
                    <h2>Paciente</h2>
                    <LoginForm
                        formType="susNumber"
                        placeholder="Insira seu número SUS"
                        onSubmit={handlePatientSubmit}
                        isLoading={isLoading}
                        inputValue={susNumber}
                        setInputValue={setSusNumber}
                    />
                    <SignupButton />
                </section>
            </div>
        </>
    );
};

export default PatientPage;