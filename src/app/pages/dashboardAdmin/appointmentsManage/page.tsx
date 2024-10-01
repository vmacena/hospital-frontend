"use client";

import React, { useState } from 'react';
import { FaUsers, FaCalendarAlt, FaStethoscope, FaSignOutAlt, FaArrowLeft, FaCalendar } from 'react-icons/fa'; 
import styles from '@/app/assets/styles/dashAdmin/dash.module.scss'; 
import tableStyles from '@/app/assets/styles/dashAdmin/table.module.scss';
import axios from 'axios';
import AppointmentsTable from '@/app/components/AppointmentsTable'; 
import ScheduleAppointmentModal from '@/app/components/ScheduleModal'; // Ajuste o caminho conforme necessário
import ScheduleExamModal from '@/app/components/ScheduleExamModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <a href="/pages/dashboardAdmin">
            <FaArrowLeft style={{ marginRight: '8px' }} />
            Voltar
          </a>
        </li>
        <li>
          <a href="#" onClick={openModal}>
            <FaCalendarAlt style={{ marginRight: '8px' }} />
            Agendar Exame
          </a>
        </li>
      </ul>
      <div className={styles.signout}>
        <a href="/" onClick={() => localStorage.removeItem("token")}>
          <FaSignOutAlt style={{ marginRight: '8px' }} />
          Sair
        </a>
      </div>
      {isModalOpen && <ScheduleExamModal onClose={closeModal} />}
    </div>
  );
}