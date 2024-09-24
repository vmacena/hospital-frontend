"use client";

import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "@/app/assets/styles/dashDoctor/dash.module.scss";
import { endpointsConfig } from "@/app/hooks/endpoints";

export default function PatientDashboard() {
  interface Appointment {
    id: number;
    doctor: {
      nameDoctor: string;
    };
    date: string;
    status: string;
  }

  interface Exam {
    id: number;
    doctor: {
      nameDoctor: string;
    };
    date: string;
    type: string;
  }

  const [activeView, setActiveView] = useState<"viewAppointments" | "viewExams">("viewAppointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false); // Controle de animação de saída
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentsAndExams = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(endpointsConfig.patient.appointments.findAll, {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });

        const examResponse = await fetch(endpointsConfig.patient.exams.findAll, {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok || !examResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const appointmentData = await response.json();
        const examData = await examResponse.json();

        setAppointments(appointmentData);
        setExams(examData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchAppointmentsAndExams();
  }, []);

  const handleViewChange = (view: "viewAppointments" | "viewExams") => {
    setIsAnimatingOut(true); // Iniciar animação de saída
    setTimeout(() => {
      setActiveView(view); // Alterar a tabela após a animação de saída
      setIsAnimatingOut(false); // Iniciar animação de entrada
    }, 300); // Duração da animação
  };

  return (
    <div className={styles.containerCenter}>
      <Sidebar setActiveView={handleViewChange} />
      <div className={styles.panel}>
        <h1>Patient Dashboard</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className={styles.tablesContainer}>
            <div
              className={`${styles.tableWrapper} ${
                isAnimatingOut ? styles.fadeOut : styles.fadeIn
              }`}
            >
              {activeView === "viewAppointments" && (
                <>
                  <h2>Minhas Consultas</h2>
                  <table className={styles.logsTable}>
                    <thead>
                      <tr>
                        <th>Médico</th>
                        <th>Data</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                          <tr key={appointment.id}>
                            <td>{appointment.doctor.nameDoctor}</td>
                            <td>{new Date(appointment.date).toLocaleString()}</td>
                            <td>{appointment.status}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3}>Nenhuma consulta marcada</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              )}
              {activeView === "viewExams" && (
                <>
                  <h2>Meus Exames</h2>
                  <table className={styles.logsTable}>
                    <thead>
                      <tr>
                        <th>Exame</th>
                        <th>Data</th>
                        <th>Médico</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exams.length > 0 ? (
                        exams.map((exam) => (
                          <tr key={exam.id}>
                            <td>{exam.type}</td>
                            <td>{new Date(exam.date).toLocaleString()}</td>
                            <td>{exam.doctor.nameDoctor}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3}>Nenhum exame marcado</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Sidebar({
  setActiveView,
}: {
  setActiveView: (view: "viewAppointments" | "viewExams") => void;
}) {
  return (
    <div className={styles.sidebar}>
      <h2>Menu</h2>
      <ul>
        <li>
          <button
            onClick={() => setActiveView("viewAppointments")}
            className={styles.sidebarButton}
            aria-label="Ver Consultas"
          >
            <FaCalendarAlt style={{ marginRight: "8px" }} />
            Ver Consultas
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveView("viewExams")}
            className={styles.sidebarButton}
            aria-label="Ver Exames"
          >
            <FaFileAlt style={{ marginRight: "8px" }} />
            Ver Exames
          </button>
        </li>
      </ul>
      <div className={styles.signout}>
        <a
          href="/"
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          <FaSignOutAlt style={{ marginRight: "8px" }} />
          Sair
        </a>
      </div>
    </div>
  );
}
