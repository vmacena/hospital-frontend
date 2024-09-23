"use client";

import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import styles from '@/app/assets/styles/dashAdmin/dash.module.scss';
import tableStyles from '@/app/assets/styles/dashAdmin/table.module.scss';
import axios from 'axios';
import { getEndpoint, endpointsConfig } from '@/app/hooks/endpoints';

interface Doctor {
    nameDoctor: string;
    specialty: string;
}

export default function DoctorsTable() {
    const [loading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(getEndpoint(endpointsConfig.admin.doctors.findAll), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDoctors(response.data as Doctor[]);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className={styles.containerCenter}>
            <Sidebar />
            <div className={styles.panel}>
                <h2 className={tableStyles.h2}>DOUTORES CADASTRADOS NO SISTEMA</h2>
                <div className={tableStyles.tablesContainer}>
                    <div className={tableStyles.tableWrapper}>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className={tableStyles.logsTableContainer}>
                                <table className={tableStyles.logsTable}>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Especialidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doctors.map((doctor, index) => (
                                            <tr key={index}>
                                                <td>{doctor.nameDoctor}</td>
                                                <td>{doctor.specialty}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
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
                <a href="/" onClick={() => localStorage.removeItem("token")}>
                    <FaSignOutAlt style={{ marginRight: '8px' }} />
                    Sair
                </a>
            </div>
        </div>
    );
}