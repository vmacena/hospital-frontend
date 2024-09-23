"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './../../page.module.scss';
import logoImg from '/public/logo.png';
import { useDoctorRegister } from '@/app/auth/signup/doctor/useDoctorRegister';
import { usePatientRegister } from '@/app/auth/signup/patient/usePatientRegister';
import PatientModal from '@/app/components/PatientModal';

export default function Signup() {
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorCrm, setDoctorCrm] = useState("");
  const [doctorSpecialty, setDoctorSpecialty] = useState("");

  interface PatientInfo {
    namePatient: string;
    email: string;
    susNumber: string;
  }

  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

  const { registerPatient, loading: patientLoading, error: patientError, patientInfo: patientData } = usePatientRegister();
  const { registerDoctor, loading: doctorLoading, error: doctorError } = useDoctorRegister();

  useEffect(() => {
    if (patientData) {
      setPatientInfo({
        susNumber: patientData.susNumber,
        namePatient: patientData.namePatient,
        email: patientData.email,
      });
    }
  }, [patientData]);

  const handlePatientSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerPatient({ namePatient: patientName, email: patientEmail });
  };

  const handleDoctorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const doctorData = {
      crm: doctorCrm,
      nameDoctor: doctorName,
      specialty: doctorSpecialty,
    };
    await registerDoctor(doctorData);
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
          <form onSubmit={handlePatientSubmit}>
            <input 
              type="text"
              required
              name="name"
              placeholder="Digite seu nome completo"
              className={styles.input}
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />

            <input 
              type="email"
              required
              name="email"
              placeholder="Digite seu email"
              className={styles.input}
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
            />

            <button type="submit" className={styles.button} disabled={patientLoading}>
              {patientLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            {patientError && <p className={styles.error}>{patientError}</p>}
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>
        </section>

        <section className={styles.panel}>
          <h2>Médico</h2>
          <form onSubmit={handleDoctorSubmit}>
            <input 
              type="text"
              required
              name="name"
              placeholder="Digite seu nome completo"
              className={styles.input}
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />

            <input 
              type="text"
              required
              name="crm"
              placeholder="Digite seu CRM"
              className={styles.input}
              value={doctorCrm}
              onChange={(e) => setDoctorCrm(e.target.value)}
            />

            <input 
              type="text"
              required
              name="specialty"
              placeholder="Digite sua especialidade"
              className={styles.input}
              value={doctorSpecialty}
              onChange={(e) => setDoctorSpecialty(e.target.value)}
            />

            <button type="submit" className={styles.button} disabled={doctorLoading}>
              {doctorLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            {doctorError && <p className={styles.error}>{doctorError}</p>}
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>
        </section>
      </div> 
      <ToastContainer />
      {patientInfo && (
        <PatientModal 
          patientInfo={patientInfo} 
          onClose={() => setPatientInfo(null)} 
        />
      )}
    </>
  );
}