import { useState } from 'react';
import { useRouter } from 'next/navigation';
import endpoints from './../endpoints.json';
import { toast } from 'react-toastify';

export const useDoctorAuth = () => {
  const [crm, setCrmNumber] = useState<string>('');
  const router = useRouter();

  const handleDoctorSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      console.log('Enviando número CRM:', crm);

      const response = await fetch(endpoints.doctor.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ crm })
      });

      console.log('Resposta da API:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Dados recebidos:', data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          router.push('/pages/dashboardDoctor'); // Redireciona para o dashboard do médico
          toast.success('Login realizado com sucesso!');
        } else {
          toast.error('Número CRM inválido');
        }
      } else {
        const errorData = await response.json();
        console.log('Erro da API:', errorData);
        toast.error('Número CRM inválido');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login');
    }
  };

  return {
    crm,
    setCrmNumber,
    handleDoctorSubmit
  };
};