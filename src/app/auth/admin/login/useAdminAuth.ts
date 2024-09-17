import { useState } from 'react';
import { useRouter } from 'next/navigation';
import endpoints from '../../endpoints.json';
import { toast } from 'react-toastify';

export const useAdminAuth = () => {
    const [adminCredential, setAdminCredential] = useState<string>('');
    const router = useRouter();

    const handleAdminSubmit = async (event: React.FormEvent,
        setSuccessMessage: unknown,
        setErrorMessage: unknown) => {
        event.preventDefault();

        try {
            console.log('Enviando credencial:', adminCredential);

            const response = await fetch(endpoints.loginAdmin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ record: adminCredential })
            });

            console.log('Resposta da API:', response);

            if (response.ok) {
                const data = await response.json();
                console.log('Dados recebidos:', data);
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    router.push('/pages/dashboardAdmin');
                } else {
                    toast.error('Credencial inválida');
                }
            } else {
                const errorData = await response.json();
                console.log('Erro da API:', errorData);
                toast.error('Credencial inválida');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            toast.error('Erro ao fazer login');
        }
    };

    return {
        adminCredential,
        setAdminCredential,
        handleAdminSubmit
    };
};