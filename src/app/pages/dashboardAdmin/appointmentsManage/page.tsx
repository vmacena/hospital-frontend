"use client";

import React, { useEffect, useState } from 'react';
import { FaUsers, FaCalendarAlt, FaStethoscope, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa'; 
import styles from '@/app/assets/styles/dashAdmin/dash.module.scss'; 
import tableStyles from '@/app/assets/styles/dashAdmin/table.module.scss';
import axios from 'axios';
import AppointmentsTable from '@/app/components/AppointmentsTable'; 

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