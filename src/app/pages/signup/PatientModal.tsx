import React from 'react';
import { FaCopy } from 'react-icons/fa';
import styles from '@/app/assets/styles/signup/PatientModal.module.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PatientModalProps {
  patientInfo: {
    susNumber: string;
    namePatient: string;
    email: string;
  };
  onClose: () => void;
}

const PatientModal: React.FC<PatientModalProps> = ({ patientInfo, onClose }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Número SUS copiado para a área de transferência!');
    }).catch(err => {
      console.error('Erro ao copiar o texto: ', err);
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Paciente Cadastrado</h2>
        <p>
          <strong>Número SUS:</strong> {patientInfo.susNumber}
          <FaCopy 
            className={styles.copyIcon} 
            onClick={() => copyToClipboard(patientInfo.susNumber)} 
            title="Copiar Número SUS"
          />
        </p>
        <p><strong>Nome:</strong> {patientInfo.namePatient}</p>
        <p><strong>Email:</strong> {patientInfo.email}</p>
        <button onClick={onClose} className={styles.button}>Fechar</button>
      </div>
    </div>
  );
};

export default PatientModal;