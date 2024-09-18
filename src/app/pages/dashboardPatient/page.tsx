import React from 'react';
import { FaCalendarAlt, FaUserMd, FaUser, FaSignOutAlt } from 'react-icons/fa'; 
import styles from '@/app/assets/styles/dashPatient/dash.module.scss'; 

export default function PatientDashboard() {
  return (
    <div className={styles.containerCenter}>
      <Sidebar />
      <div className={styles.panel}>
        <h2>Patient Dashboard</h2>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <a href="/view-appointments">
            <FaCalendarAlt style={{ marginRight: '8px' }} />
            Ver Consultas
          </a>
        </li>
        <li>
          <a href="/book-appointment">
            <FaUserMd style={{ marginRight: '8px' }} />
            Marcar Consulta
          </a>
        </li>
        <li>
          <a href="/profile">
            <FaUser style={{ marginRight: '8px' }} />
            Perfil
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