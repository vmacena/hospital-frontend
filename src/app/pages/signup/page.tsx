"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './../../page.module.scss';
import logoImg from '/public/logo.png';
import { useDoctorRegister } from '@/app/hooks/signup/doctor/useDoctorRegister';
import { usePatientRegister } from '@/app/hooks/signup/patient/usePatientRegister';
import PatientModal from '@/app/components/PatientModal';

interface SearchModalProps {
    onClose: () => void;
    onSelect: (url: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchResults: string[];
    fetchPictures: (query: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelect, searchQuery, setSearchQuery, searchResults, fetchPictures }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Buscar Foto</h2>
                <input
                    type="text"
                    placeholder="Digite para buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.input}
                />
                <button onClick={() => fetchPictures(searchQuery)} className={styles.button}>Buscar</button>
                <div className={styles.imageGrid}>
                    {searchResults.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt="Search Result"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                            onClick={() => {
                                onSelect(url);
                                onClose();
                            }}
                        />
                    ))}
                </div>
                <button onClick={onClose} className={styles.button}>Fechar</button>
            </div>
        </div>
    );
};

export default function Signup() {
    const [patientName, setPatientName] = useState("");
    const [patientEmail, setPatientEmail] = useState("");
    const [patientCep, setPatientCep] = useState("");
    const [patientStreet, setPatientStreet] = useState("");
    const [patientDistrict, setPatientDistrict] = useState("");
    const [patientState, setPatientState] = useState("");
    const [patientCity, setPatientCity] = useState("");
    const [patientNumber, setPatientNumber] = useState("");
    const [patientComplement, setPatientComplement] = useState("");
    const [patientPictureUrl, setPatientPictureUrl] = useState("");
    const [patientPictureFile, setPatientPictureFile] = useState<File | null>(null);
    const [patientPictureOption, setPatientPictureOption] = useState("upload");
    const [patientSearchQuery, setPatientSearchQuery] = useState("");
    const [patientSearchResults, setPatientSearchResults] = useState<string[]>([]);
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);

    const [doctorName, setDoctorName] = useState("");
    const [doctorCrm, setDoctorCrm] = useState("");
    const [doctorSpecialty, setDoctorSpecialty] = useState("");
    const [doctorPictureUrl, setDoctorPictureUrl] = useState("");
    const [doctorPictureFile, setDoctorPictureFile] = useState<File | null>(null);
    const [doctorPictureOption, setDoctorPictureOption] = useState("upload");
    const [doctorSearchQuery, setDoctorSearchQuery] = useState("");
    const [doctorSearchResults, setDoctorSearchResults] = useState<string[]>([]);
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);

    interface PatientInfo {
        namePatient: string;
        email: string;
        susNumber: string;
    }

    const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

    const { registerPatient, loading: patientLoading, error: patientError, patientInfo: patientData } = usePatientRegister();
    const { registerDoctor, loading: doctorLoading, error: doctorError } = useDoctorRegister();

    useEffect(() => {
        if (patientData) {
            setPatientInfo({
                susNumber: patientData.susNumber,
                namePatient: patientData.namePatient,
                email: patientData.email,
            });
        }
    }, [patientData]);

    const handlePatientSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const address = {
            cep: patientCep,
            street: patientStreet,
            district: patientDistrict,
            state: patientState,
            city: patientCity,
            number: patientNumber,
            complement: patientComplement,
        };
        const patientData = {
            namePatient: patientName,
            email: patientEmail,
            address,
            picture_url: patientPictureUrl,
        };
        await registerPatient(patientData);
    };

    const handleDoctorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const doctorData = {
            crm: doctorCrm,
            nameDoctor: doctorName,
            specialty: doctorSpecialty,
            picture_url: doctorPictureUrl,
        };
        if (doctorPictureFile) {
            // Handle file upload logic here
        }
        await registerDoctor(doctorData);
    };

    const fetchAddress = async (cep: string) => {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setPatientStreet(data.logradouro);
        setPatientDistrict(data.bairro);
        setPatientState(data.uf);
        setPatientCity(data.localidade);
    };

    const fetchPatientPictures = async (query: string) => {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
            headers: {
                Authorization: 'YOUR_PEXELS_API_KEY'
            }
        });
        const data = await response.json();
        setPatientSearchResults(data.photos.map((photo: any) => photo.src.medium));
    };

    const fetchDoctorPictures = async (query: string) => {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
            headers: {
                Authorization: 'YOUR_PEXELS_API_KEY'
            }
        });
        const data = await response.json();
        setDoctorSearchResults(data.photos.map((photo: any) => photo.src.medium));
    };

    useEffect(() => {
        if (patientCep.length === 9) {
            fetchAddress(patientCep);
        }
    }, [patientCep]);

    useEffect(() => {
        if (patientPictureOption === "api" && patientSearchQuery) {
            fetchPatientPictures(patientSearchQuery);
        }
    }, [patientPictureOption, patientSearchQuery]);

    useEffect(() => {
        if (doctorPictureOption === "api" && doctorSearchQuery) {
            fetchDoctorPictures(doctorSearchQuery);
        }
    }, [doctorPictureOption, doctorSearchQuery]);

    const handlePatientPictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPatientPictureFile(e.target.files[0]);
            setPatientPictureUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleDoctorPictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDoctorPictureFile(e.target.files[0]);
            setDoctorPictureUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <>
            <div className={styles.containerCenter}>
                <Image
                    src={logoImg}
                    alt="Logo"
                    className={styles.imageZoom}
                />

                <section className={styles.panel}>
                    <h2>Paciente</h2>
                    <form onSubmit={handlePatientSubmit}>
                        <input
                            type="text"
                            required
                            name="name"
                            placeholder="Digite seu nome completo"
                            className={styles.input}
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                        />

                        <input
                            type="email"
                            required
                            name="email"
                            placeholder="Digite seu email"
                            className={styles.input}
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                        />

                        <input
                            type="text"
                            required
                            name="cep"
                            placeholder="Digite seu CEP"
                            className={styles.input}
                            value={patientCep}
                            onChange={(e) => setPatientCep(e.target.value)}
                        />

                        <input
                            type="text"
                            required
                            name="street"
                            placeholder="Rua"
                            className={styles.input}
                            value={patientStreet}
                            readOnly
                        />

                        <input
                            type="text"
                            required
                            name="district"
                            placeholder="Bairro"
                            className={styles.input}
                            value={patientDistrict}
                            readOnly
                        />

                        <input
                            type="text"
                            required
                            name="state"
                            placeholder="Estado"
                            className={styles.input}
                            value={patientState}
                            readOnly
                        />

                        <input
                            type="text"
                            required
                            name="city"
                            placeholder="Cidade"
                            className={styles.input}
                            value={patientCity}
                            readOnly
                        />

                        <input
                            type="text"
                            required
                            name="number"
                            placeholder="Número"
                            className={styles.input}
                            value={patientNumber}
                            onChange={(e) => setPatientNumber(e.target.value)}
                        />

                        <input
                            type="text"
                            name="complement"
                            placeholder="Complemento"
                            className={styles.input}
                            value={patientComplement}
                            onChange={(e) => setPatientComplement(e.target.value)}
                        />

                        <select
                            value={patientPictureOption}
                            onChange={(e) => {
                                setPatientPictureOption(e.target.value);
                                if (e.target.value === "api") {
                                    setIsPatientModalOpen(true);
                                }
                            }}
                            className={styles.input}
                        >
                            <option value="upload">Upload de Foto</option>
                            <option value="api">Buscar na API</option>
                        </select>

                        {patientPictureOption === "upload" && (
                            <input
                                type="file"
                                name="picture"
                                accept="image/*"
                                className={styles.input}
                                onChange={handlePatientPictureUpload}
                            />
                        )}

                        {patientPictureUrl && (
                            <img src={patientPictureUrl} alt="Patient" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        )}

                        <button type="submit" className={styles.button} disabled={patientLoading}>
                            {patientLoading ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                        {patientError && <p className={styles.error}>{patientError}</p>}
                    </form>

                    <Link href="/" className={styles.text}>
                        Já possui uma conta? Faça o login
                    </Link>
                </section>

                <section className={styles.panel}>
                    <h2>Médico</h2>
                    <form onSubmit={handleDoctorSubmit}>
                        <input
                            type="text"
                            required
                            name="name"
                            placeholder="Digite seu nome completo"
                            className={styles.input}
                            value={doctorName}
                            onChange={(e) => setDoctorName(e.target.value)}
                        />

                        <input
                            type="text"
                            required
                            name="crm"
                            placeholder="Digite seu CRM"
                            className={styles.input}
                            value={doctorCrm}
                            onChange={(e) => setDoctorCrm(e.target.value)}
                        />

                        <input
                            type="text"
                            required
                            name="specialty"
                            placeholder="Digite sua especialidade"
                            className={styles.input}
                            value={doctorSpecialty}
                            onChange={(e) => setDoctorSpecialty(e.target.value)}
                        />

                        <select
                            value={doctorPictureOption}
                            onChange={(e) => {
                                setDoctorPictureOption(e.target.value);
                                if (e.target.value === "api") {
                                    setIsDoctorModalOpen(true);
                                }
                            }}
                            className={styles.input}
                        >
                            <option value="upload">Upload de Foto</option>
                            <option value="api">Buscar na API</option>
                        </select>

                        {doctorPictureOption === "upload" && (
                            <input
                                type="file"
                                name="picture"
                                accept="image/*"
                                className={styles.input}
                                onChange={handleDoctorPictureUpload}
                            />
                        )}

                        {doctorPictureUrl && (
                            <img src={doctorPictureUrl} alt="Doctor" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        )}

                        <button type="submit" className={styles.button} disabled={doctorLoading}>
                            {doctorLoading ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                        {doctorError && <p className={styles.error}>{doctorError}</p>}
                    </form>

                    <Link href="/" className={styles.text}>
                        Já possui uma conta? Faça o login
                    </Link>
                </section>
            </div>
            <ToastContainer />
            {patientInfo && (
                <PatientModal
                    patientInfo={patientInfo}
                    onClose={() => setPatientInfo(null)}
                />
            )}
            {isPatientModalOpen && (
                <SearchModal
                    onClose={() => setIsPatientModalOpen(false)}
                    onSelect={(url) => {
                        setPatientPictureUrl(url);
                        setIsPatientModalOpen(false);
                    }}
                    searchQuery={patientSearchQuery}
                    setSearchQuery={setPatientSearchQuery}
                    searchResults={patientSearchResults}
                    fetchPictures={fetchPatientPictures}
                />
            )}
            {isDoctorModalOpen && (
                <SearchModal
                    onClose={() => setIsDoctorModalOpen(false)}
                    onSelect={(url) => {
                        setDoctorPictureUrl(url);
                        setIsDoctorModalOpen(false);
                    }}
                    searchQuery={doctorSearchQuery}
                    setSearchQuery={setDoctorSearchQuery}
                    searchResults={doctorSearchResults}
                    fetchPictures={fetchDoctorPictures}
                />
            )}
        </>
    );
}