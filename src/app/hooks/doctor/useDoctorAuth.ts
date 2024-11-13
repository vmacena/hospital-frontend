"use client";

import { useState } from 'react';
import { toast } from 'react-toastify';
import { endpointsConfig } from '@/app/hooks/endpoints';

export const useDoctorAuth = () => {
    const [crm, setCrmNumber] = useState<string>('');

    const handleDoctorSubmit = async (event: React.FormEvent, router: any) => {
        event.preventDefault();

        try {
            console.log('Enviando número CRM:', crm);

            const response = await fetch(endpointsConfig.doctor.login, {
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
                    if (data.doctor && data.doctor.picture_url) {
                        localStorage.setItem('picture_url', data.doctor.picture_url); // Armazenar a URL da foto de perfil
                    }
                    router.push('/pages/dashboardDoctor'); 
                    toast.success('Login realizado com sucesso!');
                } else {
                    toast.error('Número CRM inválido');
                }
            } else {
                toast.error('Erro ao realizar login');
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            toast.error('Erro ao realizar login');
        }
    };

    return {
        crm,
        setCrmNumber,
        handleDoctorSubmit
    };
};