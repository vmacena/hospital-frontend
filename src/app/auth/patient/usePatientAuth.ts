import { useState } from 'react';
import { useRouter } from 'next/navigation';
import endpoints from './../endpoints.json';
import { toast } from 'react-toastify';

export const usePatientAuth = () => {
  const [susNumber, setSusNumber] = useState<string>('');
  const router = useRouter();

  const handlePatientSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      console.log('Enviando número SUS:', susNumber);

      const response = await fetch(endpoints.patient.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ susNumber })
      });

      console.log('Resposta da API:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Dados recebidos:', data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          router.push('/pages/dashboardPatient');
          toast.success('Login realizado com sucesso!');
        } else {
          toast.error('Número SUS inválido');
        }
      } else {
        const errorData = await response.json();
        console.log('Erro da API:', errorData);
        toast.error('Número SUS inválido');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login');
    }
  };

  return {
    susNumber,
    setSusNumber,
    handlePatientSubmit
  };
};