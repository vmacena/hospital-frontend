import { useState } from 'react';
import { toast } from 'react-toastify';
import endpoints from '../../endpoints.json';
import 'react-toastify/dist/ReactToastify.css';

interface DoctorData {
  crm: string;
  nameDoctor: string;
  specialty: string;
}

export const useDoctorRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerDoctor = async (doctorData: DoctorData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoints.doctor.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) {
        throw new Error('Failed to register doctor');
      }

      toast.success('Médico cadastrado com sucesso!');
    } catch (error) {
      console.error('Error registering doctor:', error);
      setError('Erro ao cadastrar médico');
      toast.error('Erro ao cadastrar médico');
    } finally {
      setLoading(false);
    }
  };

  return { registerDoctor, loading, error };
};