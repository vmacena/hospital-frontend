"use client";

import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaUserMd,
  FaUser,
  FaFileAlt,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";
import styles from "@/app/assets/styles/dashDoctor/dash.module.scss";

export default function PatientDashboard() {
  interface Appointment {
    id: number;
    doctor: {
      name: string;
    };
    date: string;
    type: string;
  }

  interface Exam {
    id: number;
    doctor: {
      name: string;
    };
    date: string;
    type: string;
  }

  interface Stats {
    totalAppointments: number;
    totalExams: number;
    upcomingAppointments: number;
    completedExams: number;
  }

  const [activeView, setActiveView] = useState<
    "viewAppointments" | "bookAppointment" | "viewExams" | "profile" | "stats"
  >("viewAppointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  // Fetch Appointments and Exams
  useEffect(() => {
    const fetchAppointmentsAndExams = async () => {
      try {
        if (typeof window === "undefined") {
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("http://localhost:8080/patient/appointments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const examResponse = await fetch("http://localhost:8080/patient/exams", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const profileId = "123"; // Use actual logic to retrieve patient ID
        const profileResponse = await fetch(
          `http://localhost:8080/patient/${profileId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok || !examResponse.ok || !profileResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const appointmentData = await response.json();
        const examData = await examResponse.json();
        const profileData = await profileResponse.json();

        setAppointments(appointmentData);
        setExams(examData);
        setProfile(profileData);

        // Fetch stats if needed
        const statsResponse = await fetch("http://localhost:8080/admin/stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }
        setLoading(false); // Loading completed
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchAppointmentsAndExams();
  }, []);

  const handleViewChange = (
    view: "viewAppointments" | "bookAppointment" | "viewExams" | "profile" | "stats"
  ) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveView(view);
      setIsAnimating(false);
    }, 300);
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
            {activeView === "viewAppointments" && (
              <div
                className={`${styles.tableWrapper} ${
                  isAnimating ? styles.fadeOut : styles.fadeIn
                }`}
              >
                <h2>Minhas Consultas</h2>
                <table className={styles.logsTable}>
                  <thead>
                    <tr>
                      <th>Médico</th>
                      <th>Data</th>
                      <th>Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length > 0 ? (
                      appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>{appointment.doctor.name}</td>
                          <td>{new Date(appointment.date).toLocaleString()}</td>
                          <td>{appointment.type}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}>Nenhuma consulta marcada</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {activeView === "viewExams" && (
              <div
                className={`${styles.tableWrapper} ${
                  isAnimating ? styles.fadeOut : styles.fadeIn
                }`}
              >
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
                          <td>{exam.doctor.name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}>Nenhum exame marcado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {activeView === "bookAppointment" && (
              <div className={`${styles.formWrapper} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
                <h2>Marcar Consulta</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Consulta marcada");
                  }}
                >
                  <label>
                    Tipo de Consulta:
                    <select required>
                      <option value="General">Clínica Geral</option>
                      <option value="Cardiologist">Cardiologista</option>
                      <option value="Dermatologist">Dermatologista</option>
                    </select>
                  </label>
                  <label>
                    Data:
                    <input type="datetime-local" required />
                  </label>
                  <button type="submit">Marcar Consulta</button>
                </form>
              </div>
            )}
            {activeView === "profile" && profile && (
              <div
                className={`${styles.tableWrapper} ${
                  isAnimating ? styles.fadeOut : styles.fadeIn
                }`}
              >
                <h2>Meu Perfil</h2>
                <p>
                  <strong>Nome:</strong> {profile.name}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Data de Nascimento:</strong> {profile.birthdate}
                </p>
              </div>
            )}
            {activeView === "stats" && stats && (
              <div
                className={`${styles.tableWrapper} ${
                  isAnimating ? styles.fadeOut : styles.fadeIn
                }`}
              >
                <h2>Estatísticas</h2>
                <p>
                  <strong>Total de Consultas:</strong> {stats.totalAppointments}
                </p>
                <p>
                  <strong>Total de Exames:</strong> {stats.totalExams}
                </p>
                <p>
                  <strong>Próximas Consultas:</strong> {stats.upcomingAppointments}
                </p>
                <p>
                  <strong>Exames Concluídos:</strong> {stats.completedExams}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Sidebar({
  setActiveView,
}: {
  setActiveView: (
    view: "viewAppointments" | "bookAppointment" | "viewExams" | "profile" | "stats"
  ) => void;
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
            onClick={() => setActiveView("bookAppointment")}
            className={styles.sidebarButton}
            aria-label="Marcar Consulta"
          >
            <FaUserMd style={{ marginRight: "8px" }} />
            Marcar Consulta
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
