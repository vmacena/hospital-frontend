import React from 'react';
import { FaCalendarAlt, FaUser, FaClipboardList, FaSignOutAlt } from 'react-icons/fa'; 
import styles from '../../styles/dashDoctor/dash.module.scss'; 

export default function DoctorDashboard() {
  return (
    <div className={styles.containerCenter}>
      <Sidebar />
      <div className={styles.panel}>
        <h2>Doctor Dashboard</h2>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className={styles.sidebar}>
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