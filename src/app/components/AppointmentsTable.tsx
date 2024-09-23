"use client";

import React, { useEffect, useState } from 'react';
import styles from '@/app/assets/styles/dashAdmin/table.module.scss';
import modalStyles from '@/app/assets/styles/signup/PatientModal.module.scss';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import { getEndpoint, endpointsConfig } from '@/app/auth/endpoints';

interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  status: string;
  patient?: {
    namePatient: string;
  };
  doctor?: {
    nameDoctor: string;
  };
}

const AppointmentsTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {

    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(getEndpoint(endpointsConfig.admin.appointments.findAll), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAppointments(response.data as Appointment[]);
      } catch (error) {
        setError("Error fetching appointments");
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(appointment.date);
    setNewStatus(appointment.status);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAppointment(null);
  };

  const handleEdit = async () => {
    if (!selectedAppointment) return;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(getEndpoint(endpointsConfig.admin.appointments.update, { id: selectedAppointment.id }), {
        date: newDate,
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(`Appointment with ID: ${selectedAppointment.id} edited successfully`, response.data);
      // Update the state with the edited appointment
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === selectedAppointment.id ? { ...appointment, ...(response.data as Appointment) } : appointment
        )
      );
      closeModal();
    } catch (error) {
      console.error(`Error editing appointment with ID: ${selectedAppointment.id}`, error);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(getEndpoint(endpointsConfig.admin.appointments.delete, { id }), {
 headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(`Appointment with ID: ${id} deleted successfully`);
      // Update the state to remove the deleted appointment
      setAppointments(prevAppointments =>
        prevAppointments.filter(appointment => appointment.id !== id)
      );
    } catch (error) {
      console.error(`Error deleting appointment with ID: ${id}`, error);
    }
  };

  return (
    <div className={styles.logsTableContainer}>
      <h2 className={styles.h2}>Appointments</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.logsTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.patient?.namePatient || 'N/A'}</td>
                <td>{appointment.doctor?.nameDoctor || 'N/A'}</td>
                <td>{new Date(appointment.date).toLocaleString()}</td>
                <td>{appointment.status}</td>
                <td>
                  <button onClick={() => openModal(appointment)}>
                    <FaEdit style={{ color: "blue", marginRight: '8px' }} />
                  </button>
                  <button onClick={() => handleDelete(appointment.id)}>
                    <FaTrashAlt style={{ color: "red" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={modalStyles.modalContent}
        overlayClassName={modalStyles.modalOverlay}
        contentLabel="Edit Appointment"
      >
        <h2>Edit Appointment</h2>
        {selectedAppointment && (
          <div>
            <label>
              Date:
              <input
                type="datetime-local"
                className={modalStyles.input}
                value={new Date(newDate).toISOString().slice(0, 16)}
                onChange={(e) => setNewDate(new Date(e.target.value).toISOString())}
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                className={modalStyles.input}
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              />
            </label>
            <button className={modalStyles.button} onClick={handleEdit}>Save</button>
            <button className={modalStyles.button} onClick={closeModal}>Cancel</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AppointmentsTable;