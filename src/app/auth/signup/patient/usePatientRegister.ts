import { useState } from 'react';
import { toast } from 'react-toastify';
import endpoints from '../../endpoints.json';
import 'react-toastify/dist/ReactToastify.css';

interface PatientData {
  namePatient: string;
  email: string;
}

interface PatientResponse {
  id: number;
  susNumber: string;
  namePatient: string;
  email: string;
  accessLevelId: number;
}

export const usePatientRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState<PatientResponse | null>(null);

  const registerPatient = async (patientData: PatientData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoints.patient.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error('Failed to register patient');
      }

      const data: PatientResponse = await response.json();
      setPatientInfo(data);
    } catch (error) {
      console.error('Error registering patient:', error);
      setError('Erro ao cadastrar paciente');
      toast.error('Erro ao cadastrar paciente');
    } finally {
      setLoading(false);
    }
  };

  return { registerPatient, loading, error, patientInfo };
};