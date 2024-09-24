"use client";

import React, { useEffect, useState } from 'react';
import { FaUserEdit, FaUserTimes, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import styles from '@/app/assets/styles/dashAdmin/dash.module.scss';
import tableStyles from '@/app/assets/styles/dashAdmin/table.module.scss';
import { endpointsConfig } from '@/app/hooks/endpoints';

interface Patient {
    id: number;
    susNumber: string;
    namePatient: string;
    email: string;
    accessLevel: {
        id: number;
        level: string;
    };
}

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <ul>
                <li>
                    <a href="/pages/dashboardAdmin">
                        <FaArrowLeft style={{ marginRight: '8px' }} />
                        Voltar
                    </a>
                </li>
            </ul>
            <div className={styles.signout}>
                <a href="/">
                    <FaSignOutAlt style={{ marginRight: '8px' }} />
                    Sair
                </a>
            </div>
        </div>
    );
}

export default function UserManagement() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAnimating] = useState(false);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch(endpointsConfig.patient.getData, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    const filteredPatients = patients.filter(patient =>
        patient.namePatient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.susNumber.includes(searchTerm)
    );

    return (
        <div className={styles.containerCenter}>
            <Sidebar />
            <div className={styles.panel}>
                <h1>BUSCAR PACIENTE</h1>
                <input
                    type="text"
                    placeholder="Buscar por nome ou número SUS"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <div className={styles.tablesContainer}>
                    <div
                        className={`${tableStyles.tableWrapper} ${isAnimating ? tableStyles.fadeOut : tableStyles.fadeIn}`}
                    >
                        <table className={tableStyles.logsTable}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Número SUS</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.length > 0 ? (
                                    filteredPatients.map((patient) => (
                                        <tr key={patient.id}>
                                            <td>{patient.namePatient}</td>
                                            <td>{patient.email}</td>
                                            <td>{patient.susNumber}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5}>Nenhum paciente encontrado</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}