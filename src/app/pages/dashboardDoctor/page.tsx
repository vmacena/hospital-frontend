"use client";

import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaUser, FaClipboardList, FaSignOutAlt } from 'react-icons/fa'; 
import styles from '@/app/assets/styles/dashDoctor/dash.module.scss'; 

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

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchAppointmentsAndExams = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://localhost:8080/doctor/appointments-exams', {
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

  return (
    <div className={styles.containerCenter}>
      <Sidebar />
      <div className={styles.panel}>
        <div className={styles.tablesContainer}>
          <div className={styles.tableWrapper}>
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
          <div className={styles.tableWrapper}>
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
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>Doctor Dashboard</h2>
      <ul>
        <li>
          <a href="/doctor/view-appointments">
            <FaCalendarAlt style={{ marginRight: '8px' }} />
            Ver Consultas
          </a>
        </li>
        <li>
          <a href="/doctor/patients">
            <FaUser style={{ marginRight: '8px' }} />
            Ver Pacientes
          </a>
        </li>
        <li>
          <a href="/doctor/exams">
            <FaClipboardList style={{ marginRight: '8px' }} />
            Ver Exames
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