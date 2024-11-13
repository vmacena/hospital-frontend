"use client";

import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './../../page.module.scss';
import logoImg from '/public/logo.png';
import PatientModal from '@/app/components/PatientModal';
import { usePatientForm } from '@/app/pages/signup/hooks/usePatientForm';
import { useDoctorForm } from '@/app/pages/signup/hooks/useDoctorForm';

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
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
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

const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '500px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

export default function Signup() {
    const {
        patientName,
        setPatientName,
        patientEmail,
        setPatientEmail,
        patientCep,
        setPatientCep,
        patientStreet,
        patientDistrict,
        patientState,
        patientCity,
        patientNumber,
        setPatientNumber,
        patientComplement,
        setPatientComplement,
        patientPictureUrl,
        setPatientPictureUrl,
        patientSearchQuery,
        setPatientSearchQuery,
        patientSearchResults,
        isPatientModalOpen,
        setIsPatientModalOpen,
        patientInfo,
        setPatientInfo,
        patientLoading,
        patientError,
        handlePatientSubmit,
        fetchPatientPictures,
    } = usePatientForm();

    const {
        doctorName,
        setDoctorName,
        doctorCrm,
        setDoctorCrm,
        doctorSpecialty,
        setDoctorSpecialty,
        doctorCep,
        setDoctorCep,
        doctorStreet,
        doctorDistrict,
        doctorState,
        doctorCity,
        doctorNumber,
        setDoctorNumber,
        doctorComplement,
        setDoctorComplement,
        doctorPictureUrl,
        setDoctorPictureUrl,
        doctorSearchQuery,
        setDoctorSearchQuery,
        doctorSearchResults,
        isDoctorModalOpen,
        setIsDoctorModalOpen,
        doctorLoading,
        doctorError,
        handleDoctorSubmit,
        fetchDoctorPictures,
    } = useDoctorForm();

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

                        <button type="button" className={styles.button} onClick={() => setIsPatientModalOpen(true)}>
                            Buscar Foto
                        </button>

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

                        <input
                            type="text"
                            required
                            name="cep"
                            placeholder="Digite seu CEP"
                            className={styles.input}
                            value={doctorCep}
                            onChange={(e) => setDoctorCep(e.target.value)}
                        />

                        <input
                            type="text"
                            required
                            name="street"
                            placeholder="Rua"
                            className={styles.input}
                            value={doctorStreet}
                            readOnly
                        />

                        <input
                            type="text"
                            required
                            name="district"
                            placeholder="Bairro"
                            className={styles.input}
                            value={doctorDistrict}
                            readOnly
                        />

                        <input
                            type="text"
                            required
                            name="state"
                            placeholder="Estado"
                            className={styles.input}
                            value={doctorState}
                            readOnly
                        />

                        <input
                            type="text"
                            required
                            name="city"
                            placeholder="Cidade"
                            className={styles.input}
                            value={doctorCity}
                            readOnly
                        />

                        <input
                            type="text"
                            required
                            name="number"
                            placeholder="Número"
                            className={styles.input}
                            value={doctorNumber}
                            onChange={(e) => setDoctorNumber(e.target.value)}
                        />

                        <input
                            type="text"
                            name="complement"
                            placeholder="Complemento"
                            className={styles.input}
                            value={doctorComplement}
                            onChange={(e) => setDoctorComplement(e.target.value)}
                        />

                        <button type="button" className={styles.button} onClick={() => setIsDoctorModalOpen(true)}>
                            Buscar Foto
                        </button>

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