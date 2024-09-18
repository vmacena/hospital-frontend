import React from 'react';
import { FaUsers, FaCalendarAlt, FaStethoscope, FaSignOutAlt } from 'react-icons/fa'; 
import styles from '@/app/assets/styles/dashAdmin/dash.module.scss'; 
import LogsTable from '@/app/components/LogsTable';

export default function AdminDashboard() {
  return (
    <div className={styles.containerCenter}>
      <Sidebar />
      <div className={styles.panel}>
        <LogsTable />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <a href="/manage-users">
            <FaUsers style={{ marginRight: '8px' }} />
            Gerenciar Usuários
          </a>
        </li>
        <li>
          <a href="/manage-appointments">
            <FaCalendarAlt style={{ marginRight: '8px' }} />
            Gerenciar Consultas
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
        <a href="/">
          <FaSignOutAlt style={{ marginRight: '8px' }} />
          Sair
        </a>
      </div>
    </div>
  );
}