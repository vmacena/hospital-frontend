"use client";

import React from 'react';
import styles from '@/app/page.module.scss';
import AdminLoginForm from '@/app/components/AdminLoginForm';

const AdminPage: React.FC = () => {
  return (
    <div className={styles.containerCenter}>
      <section className={styles.panel}>
        <h2>Admin</h2>
        <AdminLoginForm />
      </section>
    </div>
  );
};

export default AdminPage;