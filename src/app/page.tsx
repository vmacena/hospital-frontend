"use client"

import { useState } from 'react';
import styles from './page.module.scss';
import logoImg from '/public/logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from './auth/admin/useAdminAuth';

function SignupButton() {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push('/pages/signup');
  };

  return (
    <button onClick={handleSignupClick} className={styles.signupButton}>Cadastrar</button>
  );
}

export default function Page() {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const { adminCredential, setAdminCredential, handleAdminSubmit } = useAdminAuth();
  const router = useRouter();

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
            <form>
              <input 
                type="text"
                required
                name="susNumber"
                placeholder="Insira seu número SUS"
                className={styles.input}
              />
              <button type="submit" className={styles.button}>Entrar</button>
            </form>
          )}
        </section>

        <section className={styles.panel}>
          <h2>Médico</h2>
          {activeForm !== 'medico' && (
            <>
              <button onClick={() => 
                handleButtonClick('medico')}>Entrar</button>
              <SignupButton />
            </>
          )}
          {activeForm === 'medico' && (
            <form>
              <input 
                type="text"
                required
                name="crm"
                placeholder="Insira seu CRM"
                className={styles.input}
              />
              <button type="submit" 
                className={styles.button}>Entrar
              </button>
            </form>
          )}
        </section>

        <section className={styles.panel}>
          <h2>Admin</h2>
          {activeForm !== 'admin' && (
            <>
              <button 
                onClick={() => handleButtonClick('admin')}>Entrar
              </button>
            </>
          )}
          {activeForm === 'admin' && (
            <form onSubmit={(e) => handleAdminSubmit(e, null, null)}>
              <input 
                type="text"
                required
                name="credential"
                placeholder="Insira sua credencial"
                className={styles.input}
                value={adminCredential}
                onChange={(e) => setAdminCredential(e.target.value)}
              />
              <button 
                type="submit" className={styles.button}>Entrar
              </button>
            </form>
          )}
        </section>
      </div>
    </>
  );
}