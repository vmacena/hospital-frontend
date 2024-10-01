import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/app/assets/styles/signup/PatientModal.module.scss';
import { toast } from 'react-toastify';

interface ScheduleExamModalProps {
  onClose: () => void;
}

const ScheduleExamModal: React.FC<ScheduleExamModalProps> = ({ onClose }) => {
  const [patientId, setPatientId] = useState(1);
  const [doctorId, setDoctorId] = useState(1);
  const [type, setType] = useState("blood test");
  const [date, setDate] = useState("2023-12-31T10:00:00.000Z");
  const [result, setResult] = useState("pending");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const examData = {
      patientId,
      doctorId,
      type,
      date: new Date(date).toISOString(), 
      result,
    };

    console.log('Dados do exame:', examData); 

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post('http://localhost:8080/admin/exams', examData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Exame agendado com sucesso');
      onClose();
    } catch (error) {
      console.error('Erro ao agendar exame:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Dados da resposta de erro:', error.response.data);
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Agendar Exame</h2>
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
            <label className={styles.label}>Type:</label>
            <input
              type="text"
              className={styles.input}
              value={type}
              onChange={(e) => setType(e.target.value)}
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
            <label className={styles.label}>Result:</label>
            <input
              type="text"
              className={styles.input}
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />
          </div>
          <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Agendar</button>
          <button type="button" onClick={onClose} className={`${styles.button} ${styles.closeButton}`}>Fechar</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleExamModal;