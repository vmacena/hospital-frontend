import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/app/assets/styles/signup/PatientModal.module.scss';

interface ScheduleAppointmentModalProps {
  onClose: () => void;
}

const ScheduleAppointmentModal: React.FC<ScheduleAppointmentModalProps> = ({ onClose }) => {
  const [patientId, setPatientId] = useState(1);
  const [doctorId, setDoctorId] = useState(1);
  const [date, setDate] = useState("2023-12-31T10:00:00.000Z");
  const [status, setStatus] = useState("scheduled");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentData = {
      patientId,
      doctorId,
      date: new Date(date).toISOString(), // Converte a data para o formato ISO-8601
      status,
    };

    console.log('Dados da consulta:', appointmentData); // Log para depuração

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post('http://localhost:8080/admin/appointments', appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Consulta agendada com sucesso:', response.data);
      onClose();
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Dados da resposta de erro:', error.response.data);
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Agendar Consulta</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Patient ID:</label>
            <input
              type="number"
              className={styles.input}
              value={patientId}
              onChange={(e) => setPatientId(Number(e.target.value))}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Doctor ID:</label>
            <input
              type="number"
              className={styles.input}
              value={doctorId}
              onChange={(e) => setDoctorId(Number(e.target.value))}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Date:</label>
            <input
              type="datetime-local"
              className={styles.input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Status:</label>
            <input
              type="text"
              className={styles.input}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.button}>Agendar</button>
          <button type="button" onClick={onClose} className={styles.button}>Fechar</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointmentModal;