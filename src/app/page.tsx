"use client"

import { useState } from 'react';
import styles from './page.module.scss';
import logoImg from '/public/logo.svg';
import Image from 'next/image';
import SignupButton from './components/SignupButton';
import LoginForm from './components/LoginForm';
import AdminLoginForm from './components/AdminLoginForm';
import { usePatientAuth } from './auth/patient/usePatientAuth';
import { useDoctorAuth } from './auth/doctor/useDoctorAuth';

export default function Page() {
  const [activeForm, setActiveForm] = useState<string | null>(null);
<<<<<<< HEAD
  const { susNumber, setSusNumber, handlePatientSubmit } = usePatientAuth();
=======
  const { susNumber, setSusNumber, isLoading, handlePatientSubmit } = usePatientAuth();
  const { crmNumber, setCrmNumber, handleDoctorSubmit } = useDoctorAuth();
>>>>>>> bf5c28e71d16981e055ddb126afdd151d0c9f198

  const handleButtonClick = (formType: string) => {
    setActiveForm(formType);
  };

  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo"
          className={styles.imageZoom}
        />

        <section className={styles.panel}>
          <h2>Paciente</h2>
          {activeForm !== 'paciente' && (
            <>
              <button onClick={() => handleButtonClick('paciente')}>Entrar</button>
              <SignupButton />
            </>
          )}
          {activeForm === 'paciente' && (
            <LoginForm 
              formType="susNumber" 
              placeholder="Insira seu número SUS" 
              onSubmit={handlePatientSubmit} 
              isLoading={isLoading}
              inputValue={susNumber}
              setInputValue={setSusNumber}
            />
          )}
        </section>

        <section className={styles.panel}>
          <h2>Médico</h2>
          {activeForm !== 'medico' && (
            <>
              <button onClick={() => handleButtonClick('medico')}>Entrar</button>
              <SignupButton />
            </>
          )}
          {activeForm === 'medico' && (
            <LoginForm 
              formType="crm" 
              placeholder="Insira seu CRM" 
              onSubmit={handleDoctorSubmit}
              isLoading={isLoading}
              inputValue={crmNumber}
              setInputValue={setCrmNumber}
            />
          )}
        </section>

        <section className={styles.panel}>
          <h2>Admin</h2>
          {activeForm !== 'admin' && (
            <>
              <button onClick={() => handleButtonClick('admin')}>Entrar</button>
            </>
          )}
          {activeForm === 'admin' && (
            <AdminLoginForm />
          )}
        </section>
      </div>
    </>
  );
}