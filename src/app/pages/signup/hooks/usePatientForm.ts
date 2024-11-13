import { useState, useEffect } from "react";
import { usePatientRegister } from '@/app/hooks/signup/patient/usePatientRegister';

export interface PatientInfo {
    namePatient: string;
    email: string;
    susNumber: string;
}

export const usePatientForm = () => {
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
    const [patientSearchQuery, setPatientSearchQuery] = useState("");
    const [patientSearchResults, setPatientSearchResults] = useState<string[]>([]);
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
    const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

    const { registerPatient, loading: patientLoading, error: patientError, patientInfo: patientData } = usePatientRegister();

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
                Authorization: 'Go8xTIAFWVw8Fjx0A3g83iqqUBZerNbL7bP786fIp3zojNGSPal2oVOK'
            }
        });
        const data = await response.json();
        setPatientSearchResults(data.photos.map((photo: any) => photo.src.medium));
    };

    useEffect(() => {
        if (patientCep.length === 9) {
            fetchAddress(patientCep);
        }
    }, [patientCep]);

    useEffect(() => {
        if (patientSearchQuery) {
            fetchPatientPictures(patientSearchQuery);
        }
    }, [patientSearchQuery]);

    return {
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
        setPatientInfo, // Ensure this is exported
        patientLoading,
        patientError,
        handlePatientSubmit,
        fetchPatientPictures, // Ensure this is exported
    };
};