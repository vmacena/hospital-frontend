"use client";

import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaUser, FaClipboardList, FaSignOutAlt } from 'react-icons/fa'; 
import styles from '@/app/assets/styles/dashDoctor/dash.module.scss'; 
import { endpointsConfig } from '@/app/hooks/endpoints';

export default function DoctorDashboard() {
  interface Appointment {
    id: number;
    patient: {
      namePatient: string;
    };
    date: string;
    type: string;
  }

  interface Exam {
    id: number;
    patient: {
      namePatient: string;
    };
    date: string;
    type: string;
  }

  const [activeTable, setActiveTable] = useState<'appointments' | 'exams'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchAppointmentsAndExams = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(endpointsConfig.doctor.findAppointmentsAndExams, {
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
        setAppointments(data.appointments);
        setExams(data.exams);
      } catch (error) {
        console.error('Error fetching appointments and exams:', error);
      }
    };

    fetchAppointmentsAndExams();
  }, []);

  const handleTableChange = (table: 'appointments' | 'exams') => {
    setIsAnimating(true); 
    setTimeout(() => {
      setActiveTable(table); 
      setIsAnimating(false); 
    }, 300); 
  };

  return (
    <div className={styles.containerCenter}>
      <Sidebar setActiveTable={handleTableChange} />
      <div className={styles.panel}>
      <h1>Doctor Dashboard</h1>
        <div className={styles.tablesContainer}>
        {activeTable === 'appointments' ? (
          <div
          className={`${styles.tableWrapper} ${
            isAnimating ? styles.fadeOut : styles.fadeIn
          }`}
          >
            <h2>Consultas Agendadas</h2>
            <table className={styles.logsTable}>
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Data</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.patient.namePatient}</td>
                      <td>{new Date(appointment.date).toLocaleString()}</td>
                      <td>{appointment.type}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>Nenhuma consulta agendada</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div
          className={`${styles.tableWrapper} ${
            isAnimating ? styles.fadeOut : styles.fadeIn
          }`}
          >
            <h2>Exames Agendados</h2>
            <table className={styles.logsTable}>
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Data</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {exams.length > 0 ? (
                  exams.map((exam) => (
                    <tr key={exam.id}>
                      <td>{exam.patient.namePatient}</td>
                      <td>{new Date(exam.date).toLocaleString()}</td>
                      <td>{exam.type}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>Nenhum exame agendado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ setActiveTable }: { setActiveTable: (table: 'appointments' | 'exams') => void }) {
  return (
    <aside className={styles.sidebar}>
      <h2>Menu</h2>
      <ul>
        <li>
          <button onClick={() => setActiveTable('appointments')} className={styles.sidebarButton}>
            <FaCalendarAlt style={{ marginRight: '8px' }} />
            Ver Consultas
          </button>
        </li>
        <li>
          <button onClick={() => setActiveTable('exams')} className={styles.sidebarButton}>
            <FaClipboardList style={{ marginRight: '8px' }} />
            Ver Exames
          </button>
        </li>
      </ul>
      <div className={styles.signoutWrapper}>
        <div className={styles.signout}>
          <a href="/">
            <FaSignOutAlt style={{ marginRight: '8px' }} />
            Sair
          </a>
        </div>
      </div>
    </aside>
  );
}