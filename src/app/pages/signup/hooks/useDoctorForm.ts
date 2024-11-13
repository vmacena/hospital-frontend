import { useState, useEffect } from "react";
import { useDoctorRegister } from '@/app/hooks/signup/doctor/useDoctorRegister';

export const useDoctorForm = () => {
    const [doctorName, setDoctorName] = useState("");
    const [doctorCrm, setDoctorCrm] = useState("");
    const [doctorSpecialty, setDoctorSpecialty] = useState("");
    const [doctorCep, setDoctorCep] = useState("");
    const [doctorStreet, setDoctorStreet] = useState("");
    const [doctorDistrict, setDoctorDistrict] = useState("");
    const [doctorState, setDoctorState] = useState("");
    const [doctorCity, setDoctorCity] = useState("");
    const [doctorNumber, setDoctorNumber] = useState("");
    const [doctorComplement, setDoctorComplement] = useState("");
    const [doctorPictureUrl, setDoctorPictureUrl] = useState("");
    const [doctorSearchQuery, setDoctorSearchQuery] = useState("");
    const [doctorSearchResults, setDoctorSearchResults] = useState<string[]>([]);
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);

    const { registerDoctor, loading: doctorLoading, error: doctorError } = useDoctorRegister();

    const handleDoctorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const address = {
            cep: doctorCep,
            street: doctorStreet,
            district: doctorDistrict,
            state: doctorState,
            city: doctorCity,
            number: doctorNumber,
            complement: doctorComplement,
        };
        const doctorData = {
            crm: doctorCrm,
            nameDoctor: doctorName,
            specialty: doctorSpecialty,
            address,
            picture_url: doctorPictureUrl,
        };
        await registerDoctor(doctorData);
    };

    const fetchAddress = async (cep: string) => {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setDoctorStreet(data.logradouro);
        setDoctorDistrict(data.bairro);
        setDoctorState(data.uf);
        setDoctorCity(data.localidade);
    };

    const fetchDoctorPictures = async (query: string) => {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
            headers: {
                Authorization: 'Go8xTIAFWVw8Fjx0A3g83iqqUBZerNbL7bP786fIp3zojNGSPal2oVOK'
            }
        });
        const data = await response.json();
        setDoctorSearchResults(data.photos.map((photo: any) => photo.src.medium));
    };

    useEffect(() => {
        if (doctorCep.length === 9) {
            fetchAddress(doctorCep);
        }
    }, [doctorCep]);

    useEffect(() => {
        if (doctorSearchQuery) {
            fetchDoctorPictures(doctorSearchQuery);
        }
    }, [doctorSearchQuery]);

    return {
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
        fetchDoctorPictures, // Ensure this is exported
    };
};