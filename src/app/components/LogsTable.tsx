"use client";

import React, { useEffect, useState } from 'react';
import styles from '@/app/assets/styles/dashAdmin/table.module.scss';
import useFetchLogs from '@/app/auth/admin/logs/useFetchLogs';

const LogsTable: React.FC = () => {
    const { logs, loading, error } = useFetchLogs();
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className={styles.logsTableContainer}>
        <h2 className={styles.h2}>LOGS DE ACESSO</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.logsTable}>
            <thead>
              <tr>
                <th>ID</th>
                {/* <th>User Type</th> */}
                <th>Access Level</th>
                <th>Timestamp</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  {/* <td>{log.userType}</td> */}
                  <td>{log.accessLevel}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>
                    {log.userType === 'admin' && log.admin && (
                      <div>
                        <p>Credencial: {log.admin.record}</p>
                      </div>
                    )}
                    {log.userType === 'doctor' && log.doctor && (
                      <div>
                        <p>CRM: {log.doctor.crm}</p>
                        <p>Nome: {log.doctor.nameDoctor}</p>
                        <p>Especialidade: {log.doctor.specialty}</p>
                      </div>
                    )}
                    {log.userType === 'patient' && log.patient && (
                      <div>
                        <p>Número SUS: {log.patient.susNumber}</p>
                        <p>Nome: {log.patient.namePatient}</p>
                        <p>Email: {log.patient.email}</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default LogsTable;