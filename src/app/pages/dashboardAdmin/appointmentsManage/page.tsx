"use client";

import React, { useEffect, useState } from 'react';
import { FaUsers, FaCalendarAlt, FaStethoscope, FaSignOutAlt } from 'react-icons/fa'; 
import styles from '@/app/assets/styles/dashAdmin/dash.module.scss'; 
import tableStyles from '@/app/assets/styles/dashAdmin/table.module.scss'; // Import the table styles
import axios from 'axios';

export default function AdminDashboard() {
  return (
    <div className={styles.containerCenter}>
      <Sidebar />
      <div className={styles.panel}>
        <AppointmentsTable />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <a href="dashboardAdmin/userManage">
            <FaUsers style={{ marginRight: '8px' }} />
            Buscar Pacientes
          </a>
        </li>
        <li>
          <a href="/manage-appointments">
            <FaCalendarAlt style={{ marginRight: '8px' }} />
            Gerenciar Consultas
          </a>
        </li>
        <li>
          <a href="dashboardAdmin/examsManage">
            <FaCalendarAlt style={{ marginRight: '8px' }} />
            Gerenciar Exames
          </a>
        </li>
        <li>
          <a href="/manage-doctors">
            <FaStethoscope style={{ marginRight: '8px' }} />
            Gerenciar Médicos
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

function AppointmentsTable() {
  interface Appointment {
    id: number;
    patientId: number;
    doctorId: number;
    date: string;
    status: string;
  }

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get('http://localhost:8080/admin/appointments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAppointments(response.data as Appointment[]);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={tableStyles.tablesContainer}>
      <div className={tableStyles.tableWrapper}>
        <h2 className={tableStyles.h2}>Appointments</h2>
        <div className={tableStyles.logsTableContainer}>
          <table className={tableStyles.logsTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.patientId}</td>
                  <td>{appointment.doctorId}</td>
                  <td>{new Date(appointment.date).toLocaleString()}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}