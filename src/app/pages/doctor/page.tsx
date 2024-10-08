"use client";

import React, { useState } from 'react';
import styles from '@/app/page.module.scss';
import { useDoctorAuth } from '@/app/hooks/doctor/useDoctorAuth';
import LoginForm from '@/app/components/LoginForm';
import SignupButton from '@/app/components/SignupButton';
import Navbar from '@/app/components/NavBar';

const DoctorPage: React.FC = () => {
    const { crm, setCrmNumber, handleDoctorSubmit } = useDoctorAuth();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Navbar />
            <div className={styles.containerCenter}>
                <section className={styles.panel}>
                    <h2>Médico</h2>
                    <LoginForm
                        formType="crm"
                        placeholder="Insira seu CRM"
                        onSubmit={handleDoctorSubmit}
                        isLoading={isLoading}
                        inputValue={crm}
                        setInputValue={setCrmNumber}
                    />
                    <SignupButton />
                </section>
            </div>
        </>
    );
};

export default DoctorPage;