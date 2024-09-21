"use client";

import React, { useEffect, useState } from "react";
import {
    FaEdit,
    FaTrashAlt,
    FaSignOutAlt,
    FaArrowLeft,
} from "react-icons/fa";
import styles from "@/app/assets/styles/dashAdmin/dash.module.scss";
import tableStyles from "@/app/assets/styles/dashAdmin/table.module.scss";
import modalStyles from "@/app/assets/styles/components/Modal.module.scss";
import { fetchExams, handleEditExam, handleSaveEdit, handleCancelExam, Exam } from "./examsService";

export default function ExamsManage() {
    const [loading, setLoading] = useState(true);
    const [exams, setExams] = useState<Exam[]>([]);
    const [editingExam, setEditingExam] = useState<Exam | null>(null);

    useEffect(() => {
        fetchExams(setExams, setLoading);
    }, []);

    return (
        <div className={styles.containerCenter}>
            <Sidebar />
            
            <div className={styles.panel}>
            <h2 className={tableStyles.h2}>Gerenciar Exames</h2>
                <div className={tableStyles.tablesContainer}>
                    <div className={tableStyles.tableWrapper}>
                        
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className={tableStyles.logsTableContainer}>
                                <table className={tableStyles.logsTable}>
                                    <thead>
                                        <tr>
                                            <th>Exame</th>
                                            <th>Data</th>
                                            <th>Paciente</th>
                                            <th>Doutor</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exams.map((exam) => (
                                            <tr key={exam.id}>
                                                <td>{exam.type}</td>
                                                <td>{new Date(exam.date).toLocaleString()}</td>
                                                <td>{exam.patient.namePatient}</td>
                                                <td>{exam.doctor.nameDoctor}</td>
                                                <td>
                                                    <button onClick={() => handleEditExam(exam, setEditingExam)}>
                                                        <FaEdit style={{ color: "blue" }} />
                                                    </button>
                                                    <button onClick={() => handleCancelExam(exam.id, setExams)}>
                                                        <FaTrashAlt style={{ color: "red" }} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                {editingExam && (
                    <div className={modalStyles.modal}>
                        <div className={modalStyles.modalContent}>
                            <h2>Edit Exam</h2>
                            <form onSubmit={(event) => handleSaveEdit(event, editingExam, setEditingExam, setExams)}>
                                <label>
                                    Type:
                                    <input
                                        type="text"
                                        className={modalStyles.input}
                                        value={editingExam.type}
                                        onChange={(e) =>
                                            setEditingExam({ ...editingExam, type: e.target.value })
                                        }
                                    />
                                </label>
                                <label>
                                    Date:
                                    <input
                                        type="datetime-local"
                                        className={modalStyles.input}
                                        value={new Date(editingExam.date).toISOString().slice(0, 16)}
                                        onChange={(e) =>
                                            setEditingExam({ ...editingExam, date: new Date(e.target.value).toISOString() })
                                        }
                                    />
                                </label>
                                <label>
                                    Result:
                                    <input
                                        type="text"
                                        className={modalStyles.input}
                                        value={editingExam.result || ""}
                                        onChange={(e) =>
                                            setEditingExam({ ...editingExam, result: e.target.value })
                                        }
                                    />
                                </label>
                                <button type="submit" className={modalStyles.button}>
                                    <FaEdit style={{ marginRight: "8px", color: "blue" }} />
                                    Save
                                </button>
                                <button type="button" className={modalStyles.button} onClick={() => setEditingExam(null)}>
                                    <FaTrashAlt style={{ marginRight: "8px", color: "red" }} />
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
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